import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import axios from "axios";
import { Countries, DataToSearch } from "@/Interfaces";

const IMAGE_IF_FAILED_FETCH =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      languages {
        native
      }
      states {
        name
      }
      continent {
        code
        name
      }
      currency
    }
  }
`;

let countries = ref<Countries[]>([]);
let countriesInitials = ref<Countries[]>([]);

export default function UseApi() {
  let countriesWithImages = ref<Countries[]>([]);

  const { result, loading, error } = useQuery(GET_COUNTRIES);

  const getInitialData = async () => {
    if (result.value) {
      countries.value = result.value.countries;
      const firstCountries = result.value.countries.slice(0, 9);

      const countryPromises = firstCountries.map(async (country: Countries) => {
        const imageUrl = await verifyImageInData(country.code, country.name);
        return {
          ...country,
          imageUrl,
        };
      });

      countriesWithImages.value = await Promise.all(countryPromises);
      countriesInitials.value = countriesWithImages.value;
    }
  };

  const getImageByCountry = async (name: string) => {
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_API_KEY_PIXABAY
        }&q=${name}&per_page=3`
      );
      const imageUrl = data.hits[0]?.largeImageURL || IMAGE_IF_FAILED_FETCH;
      return imageUrl;
    } catch (error) {
      console.error(`Error al traer la imagen`);
      return IMAGE_IF_FAILED_FETCH;
    }
  };

  const verifyImageInData = async (code: string, countryName: string) => {
    const country = countries.value.find((el) => el.code === code);
    if (!country?.imageUrl) {
      const imageUrl = await getImageByCountry(countryName);

      const index = countries.value.findIndex((el) => el.code === code);
      let updatedCountries = [...countries.value];
      updatedCountries[index] = { ...countries.value[index], imageUrl };
      countries.value = updatedCountries;
      return imageUrl;
    }
    return;
  };

  const filterData = async (data: DataToSearch) => {
    const { country, continents } = data;
    const countriesFiltered = countries.value.filter((el) => {
      const countriesFiltered =
        !country || el.name.toLowerCase().includes(country.toLowerCase());
      const continentsFiltered =
        continents.length === 0 ||
        continents.some((continent) => el.continent.code === continent);

      return countriesFiltered && continentsFiltered;
    });

    const limitedCountries = countriesFiltered.slice(0, 30);

    const updatedCountries = await Promise.all(
      limitedCountries.map(async (country) => {
        if (!country.imageUrl) {
          const imageUrl = await getImageByCountry(country.name);
          return { ...country, imageUrl };
        }
        return country;
      })
    );

    return updatedCountries;
  };

  return {
    getInitialData,
    countries,
    countriesWithImages,
    countriesInitials,
    loading,
    error,
    filterData,
  };
}
