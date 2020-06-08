import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";
import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.pink.darken4, // #E53935
        secondary: colors.amber.darken4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
      dark: {
        primary: colors.amber, // #E53935
        secondary: colors.amber, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        background: colors.purple.darken4,
      },
    },
  },
});
