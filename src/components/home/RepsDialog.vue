<template>
  <v-dialog v-model="isVisible" max-width="600" persistent>
    <v-card>
      <v-card-title class="headline">Select Recipients</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="tableSearch"
          append-icon="mdi-magnify"
          label="Search"
          color="amber"
          single-line
          hide-details
          class="search-field"
        ></v-text-field>
      </v-card-text>
      <!-- <v-card-text>
        <v-chip-group v-model="filters" column multiple center-active>
          <v-chip filter outlined>Voted YES</v-chip>
          <v-chip filter outlined>Abstained</v-chip>
          <v-chip filter outlined>Vote Unknown</v-chip>
          <v-chip filter outlined>Voted NO</v-chip>
        </v-chip-group>
      </v-card-text>-->
      <v-data-table
        :headers="tableHeaders"
        :items="repsList"
        :single-select="false"
        :search="tableSearch"
        :footer-props="{
          'items-per-page-options': rowsPerPageItems
        }"
        :items-per-page="5"
        item-key="name"
        v-model="selectedRepsLocal"
        show-select
      >
        <!-- <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        </template>-->
      </v-data-table>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-4" text @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RepsDialog",
  components: {},
  props: ["isVisible", "repsList", "selectedReps"],
  data() {
    return {
      rowsPerPageItems: [5, 10, 15, -1],
      tableSearch: "",
      tableHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "District / Partylist",
          align: "start",
          value: "district"
        },
        {
          text: "Vote",
          align: "start",
          value: "votedYes"
        }
      ],

      selectedRepsLocal: this.selectedReps
    };
  },
  methods: {
    close() {
      this.$emit("updateSelectedReps", this.selectedRepsLocal);
    }
  },
  mounted() {
    console.log(this.selectedRepsLocal);
  }
};
</script>

<style>
</style>