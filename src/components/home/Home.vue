<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
        <h1>#JunkTerrorBill</h1>
        <p>
          Send an email to our Representatives in Congress to further strengthen
          our calls to junk the Anti-Terrorism Act of 2020!
        </p>
      </v-col>
    </v-row>
    <!-- <h1>E-mail Your Representatives</h1> -->
    <RepsTab />
    <br />

    <!-- <v-divider></v-divider>
    <br />
    <v-form>
      <v-row justify="center" no-gutters>
        <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
          <v-file-input
            v-model="source"
            label="Source File"
            required
            color="amber"
            prepend-icon="mdi-file-table-outline"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" xs="2">
          <v-btn class="default-button" @click="importFromCsv" color="amber darken-3">
            <span class="button-text">Submit</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>-->
  </v-container>
</template>

<script>
const RepsTab = () => import("@/components/home/RepsTab.vue");
const repsUtils = require("@/utils/reps-utils");
export default {
  components: {
    RepsTab,
  },
  data() {
    return {
      source: null,
    };
  },
  methods: {
    importFromCsv() {
      const complete = (reps) => {
        console.log(JSON.stringify(reps));
        // this.updateTestingCentersInDB(reps);
      };
      const error = () => {
        console.log("error");
      };
      repsUtils.get(this.$papa, this.source, complete, error);
    },
  },
};
</script>

<style></style>
