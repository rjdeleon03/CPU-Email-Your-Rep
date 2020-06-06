<template>
  <v-container>
    <v-card-title>
      <v-text-field
        v-model="tableSearch"
        append-icon="mdi-magnify"
        label="Search"
        color="pink darken-4"
        single-line
        hide-details
        class="search-field"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="reps"
      :single-select="false"
      :search="tableSearch"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <!-- <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>-->
    </v-data-table>
  </v-container>
</template>

<script>
import { repsList } from "@/data/reps-list";
export default {
  name: "RepsTab",
  data() {
    return {
      reps: repsList,

      tableSearch: "",
      tableHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "District",
          align: "start",
          value: "district"
        },
        {
          text: "Vote",
          align: "start",
          value: "votedYes"
        }
        // {
        //   text: "Positive Results",
        //   align: "end",
        //   value: "testedIndivsPositive"
        // }
      ]
    };
  },
  mounted() {
    console.log(this.$repsList);
  }
};
</script>

<style>
</style>