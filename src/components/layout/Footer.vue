<template>
  <v-footer padless>
    <v-card flat tile class="grey darken-4 white--text text-center footer-card">
      <v-card-text>
        <v-btn
          v-for="icon in icons_cpu"
          :key="icon.id"
          class="white--text sharing-btn"
          icon
          :href="icon.url"
          target="_blank"
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text
        class="white--text pt-0"
      >For inquiries, you may reach us through our social media accounts.</v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>SnT Say No to Tyranny</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      icons_agham: [
        {
          id: 1,
          icon: "mdi-facebook",
          url: "https://fb.com/agham.org"
        },
        { id: 2, icon: "mdi-twitter", url: "https://twitter.com/aghamdiliman" }
      ],
      icons_cpu: [
        {
          id: 3,
          icon: "mdi-facebook",
          url: "https://www.facebook.com/SNTsaynototyrannyPH"
        },
        {
          id: 4,
          icon: "mdi-twitter",
          url: "https://twitter.com/SNT2alliancePH"
        }
      ]
    };
  }
};
</script>

<style>
.sharing-text {
  color: white;
  font-size: 1em;
}
.sharing-btn {
  margin-top: -3px;
}
.footer-card {
  width: 100%;
}
</style>