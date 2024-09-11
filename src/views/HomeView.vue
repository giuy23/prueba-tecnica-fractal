<script setup lang="ts">
import { Countries as ICountry } from "@/Interfaces";
import Countries from "@/Pages/Countries.vue";
import Layout from "@/views/partials/Layout.vue";
import Search from "@/views/Search.vue";
import { ref, watch, onMounted } from "vue";
import UseApi from "@/composables/useApi";

const { countriesWithImages, loading, getInitialData, countriesInitials } =
  UseApi();

const countries = ref<ICountry[]>([]);

watch(
  () => loading.value,
  async () => {
    await getInitialData();
    countries.value = countriesWithImages.value;
  }
);

onMounted(() => {
  countries.value = countriesInitials.value;
});

const updateContries = (data: ICountry[]) => {
  countries.value = data;
};
</script>

<template>
  <Layout>
    <div class="flex flex-col justify-center items-center w-full">
      <Search @update="updateContries!" />
      <Countries :countries="countries" />
    </div>
  </Layout>
</template>

<style scoped></style>
