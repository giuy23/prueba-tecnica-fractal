<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import UseApi from "@/composables/useApi";
import SeacrhIcon from "@/Icons/SearchIcon.vue";
import { Countries, DataToSearch } from "@/Interfaces";

const { filterData, countriesInitials } = UseApi();

const emits = defineEmits<{
  update: Countries[];
}>();

const dataToSearch = ref<DataToSearch>({
  country: "",
  continents: [],
});

const isVisible = ref(false);
const sectionModal = ref<HTMLElement | null>(null);
const inputField = ref<HTMLInputElement | null>(null);

const searchData = async () => {
  const data: Countries[] = await filterData(dataToSearch.value);
  emits("update", data as any);
};

const handleSearchByContinets = async (code: string) => {
  const existData = dataToSearch.value.continents.find((el) => el == code);
  if (!existData) {
    dataToSearch.value.continents.push(code);
    await searchData();
  }
};

const borderActive = computed(() => (code: string) => {
  const isActive = dataToSearch.value.continents.find((el) => el === code);
  return isActive !== undefined
    ? "rounded border p-4 border-indigo-500/100"
    : "rounded border p-4";
});

const handleClearSearchData = () => {
  dataToSearch.value.continents = [];
  emits("update", countriesInitials.value as any);
};

const CONTINENTS = [
  {
    code: "EU",
    name: "Europa",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Europe_on_the_globe_%28red%29.svg/280px-Europe_on_the_globe_%28red%29.svg.png",
  },
  {
    code: "NA",
    name: "Norte America",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Location_North_America%2C_all_conceptions.svg/240px-Location_North_America%2C_all_conceptions.svg.png",
  },
  {
    code: "SA",
    name: "América del Sur",
    imageUrl:
      "//upload.wikimedia.org/wikipedia/commons/thumb/0/0f/South_America_%28orthographic_projection%29.svg/240px-South_America_%28orthographic_projection%29.svg.png",
  },
  {
    code: "AS",
    name: "Asia",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Asia_on_the_globe_%28red%29.svg/560px-Asia_on_the_globe_%28red%29.svg.png",
  },
  {
    code: "OC",
    name: "Oceanía",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Oceania_on_the_globe_%28red%29_%28Polynesia_centered%29.svg/560px-Oceania_on_the_globe_%28red%29_%28Polynesia_centered%29.svg.png",
  },
  {
    code: "AF",
    name: "Africa",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Africa_on_the_globe_%28red%29.svg/280px-Africa_on_the_globe_%28red%29.svg.png",
  },
  {
    code: "AN",
    name: "Antártica",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Antarctica_on_the_globe_%28red%29.svg/560px-Antarctica_on_the_globe_%28red%29.svg.png",
  },
];

const verifyIfModalIsOpen = (event: MouseEvent) => {
  if (
    isVisible.value &&
    sectionModal.value &&
    !sectionModal.value.contains(event.target as Node) &&
    inputField.value &&
    !inputField.value.contains(event.target as Node)
  ) {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", verifyIfModalIsOpen);
});

onUnmounted(() => {
  window.removeEventListener("click", verifyIfModalIsOpen);
});
</script>

<template>
  <div class="bg-white rounded-full w-10/12 m-auto lg:w-3/5 relative lg:mt-4">
    <form
      action=""
      @submit.prevent="searchData"
      class="flex flex-row justify-between p-3"
    >
      <div class="flex flex-col w-32 lg:w-52">
        <label for="country-search" class="text-xl lg:text-2xl">País</label>
        <input
          id="country-search"
          type="text"
          placeholder="Escribe el País que deseas ver"
          v-model="dataToSearch.country"
          @input="searchData"
          @click="isVisible = true"
          ref="inputField"
        />
      </div>
      <div
        class="bg-blue-400 rounded-full flex flex-row items-center px-1 py-0 lg:px-4 m-0 text-white"
      >
        <SeacrhIcon class="size-4 lg:size-6" />
        <button type="submit" class="text-xl lg:text-2xl">Buscar</button>
      </div>
    </form>

    <section :class="isVisible ? 'block' : 'hidden'" ref="sectionModal">
      <div class="absolute bg-white rounded-3xl w-full mt-2 shadow-lg z-10">
        <div class="flex flex-row justify-between py-2 px-4 font-semibold">
          <p>Filtrar por Continentes</p>
          <p class="text-blue-400" @click="handleClearSearchData">Limpiar</p>
        </div>
        <div
          class="grid grid-cols-3 lg:grid-cols-4 gap-3 p-2 items-center justify-center justify-items-center text-center"
        >
          <div
            v-for="continent in CONTINENTS"
            @click="handleSearchByContinets(continent.code)"
            :class="borderActive(continent.code)"
          >
            <img
              :src="continent.imageUrl"
              :alt="continent.name"
              class="size-14 lg:size-32"
            />
            <p>{{ continent.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
