<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
        <h2>Scientists and Engineers, Let’s Barrage our Science and Tech Representative Who Voted YES to the Anti-Terror Bill!</h2>
        <br />
        <p>
          The science and tech community can add its voice in Congress to junk the Anti-Terrorism Bill! We can pressure the chairperson of the House Committee on Science and Technology,
          <strong>
            <i>Rep. Aris Aumentado</i>
          </strong> from Bohol, to withdraw his YES vote so that we can bring down the majority vote for the bill and prevent its passage into law!
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
    RepsTab
  },
  data() {
    return {
      source: null
    };
  },
  methods: {
    importFromCsv() {
      const complete = reps => {
        console.log(JSON.stringify(reps));
        // this.updateTestingCentersInDB(reps);
      };
      const error = () => {
        console.log("error");
      };
      repsUtils.get(this.$papa, this.source, complete, error);
    }
  }
};
</script>

<style></style>
