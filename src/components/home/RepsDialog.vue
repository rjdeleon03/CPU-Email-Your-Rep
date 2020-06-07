<template>
  <v-dialog v-model="isVisible" max-width="600">
    <v-card>
      <v-card-title class="headline">Operation Successful</v-card-title>

      <v-card-text>
        <p align="left">Hello</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-4" text @click="isVisible = false">OK</v-btn>
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
    return {};
  },
  methods: {}
};
</script>

<style>
</style>