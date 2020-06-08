<template>
  <v-dialog v-model="isVisible" max-width="700" persistent>
    <v-card>
      <v-card-title class="headline">Select One Recipient</v-card-title>
      <v-card-text
        class="text-left"
      >Only those who voted YES are displayed. Click OK after selecting a representative.</v-card-text>
      <v-card-text>
        <v-text-field
          v-model="tableSearch"
          append-icon="mdi-magnify"
          label="Search by Name, District / Partylist, or Vote"
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
        :single-select="true"
        :search="tableSearch"
        :footer-props="{
          'items-per-page-options': rowsPerPageItems
        }"
        :items-per-page="5"
        item-key="name"
        v-model="selectedRepsLocal"
        show-select
      >
        <template v-slot:header.data-table-select></template>
        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
            :value="isSelected"
            :disabled="(limitReached && !isSelected) || item.email.length < 1 || item.email[0] == ''"
            @input="select($event)"
          ></v-simple-checkbox>
        </template>
      </v-data-table>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber" text @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RepsDialog",
  components: {},
  props: ["isVisible", "repsList", "selectedReps", ""],
  data() {
    return {
      limit: 1,
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
    },
    select(event) {
      console.log(event);
    }
  },
  watch: {
    isVisible: {
      handler(value) {
        if (value) {
          //   console.log(this.selectedReps);
          this.selectedRepsLocal = this.selectedReps;
        }
      }
    }
  },
  computed: {
    limitReached() {
      return this.selectedRepsLocal.length >= this.limit;
    }
  }
};
</script>

<style>
</style>