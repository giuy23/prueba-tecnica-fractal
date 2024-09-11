<script lang="ts" setup>
import { watch, ref, computed } from "vue";
import UseApi from "@/composables/useApi";
import { Countries } from "@/Interfaces";
import CloseIcon from "@/Icons/CloseIcon.vue";

const { countriesWithImages, loading, error } = UseApi();
const props = defineProps<{
  countries: Countries[];
}>();

const countryInfo = ref<Countries | null>(null);

watch(
  () => props.countries,
  () => {
    countriesWithImages.value = props.countries;
  }
);

const showInfoCountry = (data: Countries) => {
  countryInfo.value = { ...data };
};

const countrySelected = computed(() => (code: string) => {
  const isActive = countryInfo.value?.code === code;
  if (isActive) {
    return {
      section: "bg-blue-400",
      content: "text-white",
    };
  }
  return {
    section: "bg-white",
    content: "",
  };
});
</script>

<template>
  <div class="w-11/12 lg:w-10/12 pt-10">
    <p v-if="loading" class="text-center text-3xl text-white">Cargando...</p>

    <p v-else-if="error">Hubo un Problema con la Obtención de los Países</p>

    <div class="flex flex-col-reverse lg:flex-row">
      <section class="w-full">
        <ul
          :class="
            'grid gap-4 lg:gap-8 ' +
            (countriesWithImages.length > 3
              ? ' grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'
              : 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]')
          "
          v-if="countriesWithImages.length > 0"
        >
          <li
            v-for="country in countriesWithImages"
            :key="country.code"
            class="p-0 rounded-2xl shadow-md"
            :class="countrySelected(country.code).section"
            @click="showInfoCountry(country)"
          >
            <figure class="rounded-2xl">
              <img
                :src="country.imageUrl"
                :alt="country.name"
                class="w-full h-28 lg:h-40 rounded-t-lg"
                loading="lazy"
              />
              <div class="flex flex-row p-2 lg:p-4 gap-1 lg:gap-8 items-center">
                <img
                class="size-12"
                  :src="`https://flagcdn.com/${country.code.toLowerCase()}.svg`"
                  :alt="`bandera de ${country.name}`"
                />
                <div class="section">
                  <span
                    class="text-xl m-0 font-bold text-blue-400"
                    :class="countrySelected(country.code).content"
                  >
                    {{ country.name }}
                  </span>
                  <h2
                    class="text-md m-0"
                    :class="countrySelected(country.code).content"
                  >
                    {{ country.continent.name }}
                  </h2>
                </div>
              </div>
            </figure>
          </li>
        </ul>
      </section>
      <section v-if="countryInfo" class="w-full lg:w-3/5 lg:px-3 pb-3">
        <div class="bg-white p-3 lg:p-8 rounded-sm shadow-2xl relative">
          <div class="closeIcon" @click="countryInfo = null">
            <CloseIcon class="cursor-pointer" />
          </div>

          <img
            :src="countryInfo.imageUrl"
            :alt="countryInfo.name"
            class="w-10/12 object-cover mt-4 rounded"
          />

          <section class="flex flex-row py-3 gap-2 lg:gap-4">
            <figure>
              <img
                :src="`https://flagcdn.com/${countryInfo.code.toLowerCase()}.svg`"
                :alt="countryInfo.name"
                class="w-16 h-12"
              />
            </figure>
            <div>
              <p class="text-xl m-0 font-bold text-blue-400">
                {{ countryInfo.name }}
              </p>
              <h2 class="text-md m-0">{{ countryInfo.continent.name }}</h2>
            </div>
          </section>

          <section class="text-blue-400 font-semibold">
            <p>
              Capital:
              <span class="text-slate-500">{{ countryInfo.capital }}</span>
            </p>
            <p>
              Language:
              <span class="text-slate-500">{{
                countryInfo.languages[0].native
              }}</span>
            </p>
            <p>
              Currency:
              <span class="text-slate-500">{{ countryInfo.currency }}</span>
            </p>
            <span>Region</span>
            <ul class="max-h-40 lg:max-h-52 overflow-y-auto p-0 m-0 list-none">
              <li
                v-for="region in countryInfo.states"
                :key="region.name"
                class="text-black"
              >
                {{ region.name }}
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.closeIcon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.closeIcon svg {
  width: 25px;
  height: 25px;
}
</style>
