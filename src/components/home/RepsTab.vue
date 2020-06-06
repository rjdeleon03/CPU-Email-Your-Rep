<template>
  <v-container>
    <v-card>
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
        :items="reps"
        :single-select="false"
        :search="tableSearch"
        :footer-props="{
          'items-per-page-options': rowsPerPageItems
        }"
        :items-per-page="5"
        item-key="name"
        v-model="selectedReps"
        show-select
      >
        <!-- <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        </template>-->
      </v-data-table>
    </v-card>

    <v-row justify="center" id="table-button">
      <v-col cols="12" xs="2">
        <v-btn class="default-button" @click="sendEmailButtonClicked" color="amber darken-3">
          <span class="button-text">Send Email</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { repsList } from "@/data/reps-list";
export default {
  name: "RepsTab",
  data() {
    return {
      reps: repsList,
      selectedReps: [],
      filters: [0, 1, 2],
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
        // {
        //   text: "Positive Results",
        //   align: "end",
        //   value: "testedIndivsPositive"
        // }
      ]
    };
  },
  mounted() {
    // this.tableHeaders = this.computedHeaders;
    // this.tableSearch = "";
  },
  watch: {
    // filters: function() {
    //   this.tableHeaders = this.computedHeaders;
    // }
  },
  computed: {
    computedHeaders() {
      return [
        {
          text: "Name",
          align: "start",
          value: "name"
          // filter: value => {
          //   console.log(
          //     value.toLowerCase() +
          //       " --- " +
          //       value.toLowerCase().includes(this.tableSearch.toLowerCase())
          //   );
          //   return value.toLowerCase().includes(this.tableSearch.toLowerCase());
          // }
        },
        {
          text: "District / Partylist",
          align: "start",
          value: "district"
          // filter: value => {
          //   return value.toLowerCase().includes(this.tableSearch.toLowerCase());
          // }
        },
        {
          text: "Vote",
          align: "start",
          value: "votedYes"
          // filter: value => {
          //   // console.log(value);
          //   if (!value.toLowerCase().includes(this.tableSearch.toLowerCase()))
          //     return false;
          //   if (this.filters.indexOf(0) > -1 && value == "YES") return true;
          //   if (this.filters.indexOf(1) > -1 && value == "ABSTAIN") return true;
          //   if (this.filters.indexOf(2) > -1 && value == "-") return true;
          //   if (this.filters.indexOf(3) > -1 && value == "NO") return true;
          //   return false;
          // }
        }
      ];
    }
  },
  methods: {
    sendEmailButtonClicked() {
      console.log(this.filters);
    },
    customFilter(value, search, filter) {
      // console.log("SEARCHING: " + search);
      // console.log("VAL" + value);
      // console.log("search:" + search);
      // console.log(filter.name);
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toLowerCase().indexOf(search.toLowerCase()) != -1 &&
        this.checkAgainstVoteFilter(filter)
      );
    },
    checkAgainstVoteFilter(item) {
      if (this.filters.indexOf(0) > -1 && item.votedYes == "YES") return true;
      if (this.filters.indexOf(1) > -1 && item.votedYes == "ABSTAIN")
        return true;
      if (this.filters.indexOf(2) > -1 && item.votedYes == "-") return true;
      if (this.filters.indexOf(3) > -1 && item.votedYes == "NO") return true;
      return false;
    }
  }
};
</script>

<style>
#table-button {
  margin-top: 20px;
}
</style>