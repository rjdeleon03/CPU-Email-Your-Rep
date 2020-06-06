<template>
  <nav id="navbar">
    <v-app-bar app color="pink darken-4" dark>
      <!-- <v-app-bar-nav-icon @click="isDrawerVisible = true"></v-app-bar-nav-icon> -->

      <!-- <v-toolbar-title>COVID-19 PH Testing Tracker</v-toolbar-title> -->
      <v-spacer></v-spacer>

      <SharingMenu />
    </v-app-bar>
  </nav>
</template>

<script>
const SharingMenu = () => import("@/components/layout/SharingMenu.vue");

export default {
  name: "Navbar",
  components: {
    SharingMenu
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>

<style>
nav#navbar {
  background-color: #581845;
}
nav#navbar h3 {
  text-align: start;
}
nav#navbar .navbar-header {
  height: 230px;
  /* background-image: url("~@/assets/header_bg_400h.jpg"); */
  background-position: center center;
  background-size: cover;
  color: white;
  font-size: 1.4em;
}
nav#navbar img {
  height: 150px;
}
nav#navbar #sub {
  margin-top: -20px;
  font-size: 0.7em;
}
nav#navbar .drawer-text {
  text-align: left;
}
nav#navbar .drawer-text-right {
  text-align: left !important;
}
nav#navbar .drawer-text-right span {
  cursor: pointer !important;
}
</style>