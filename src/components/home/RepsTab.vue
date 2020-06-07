<template>
  <v-container>
    <v-form ref="form">
      <v-container fluid>
        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-card outlined class="pa-2 mx-auto" @click="displayRepsSelection">
              <p class="subheading">Recipients (Click to Add)</p>
              <v-chip-group column active-class="primary--text">
                <v-chip
                  v-for="(rep, index) in selectedReps"
                  :key="index"
                  close
                  @click:close="removeSelectedRep(rep)"
                >{{ rep.name }}</v-chip>
                <!-- <v-chip>Extra Soft</v-chip>
                <v-chip>Soft</v-chip>
                <v-chip>Medium</v-chip>
                <v-chip>Hard</v-chip>-->
              </v-chip-group>
            </v-card>
            <v-row class="footnote-row">
              <v-spacer></v-spacer>
              <v-btn outlined class="pa-2" href="https://t.co/LNhD5IMwwT?amp=1" target="_blank">
                <span>Source: #JUNKTERRORBILL Initiative</span>
              </v-btn>
              <v-btn
                outlined
                class="pa-0"
                @click="copyEmails"
                style="margin-left: 6px"
                :disabled="selectedReps.length == 0"
              >
                <span>Copy</span>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field v-model="subject" label="Subject" single-line outlined></v-text-field>
            <v-row class="footnote-row">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                class="pa-0"
                @click="copySubject"
                style="margin-left: 6px"
                :disabled="subject == ''"
              >
                <span>Copy</span>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-textarea v-model="body" label="Body" single-line outlined></v-textarea>
            <v-row class="footnote-row">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                class="pa-0"
                @click="copyBody"
                style="margin-left: 6px"
                :disabled="body == ''"
              >
                <span>Copy</span>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <br />
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <p class="note">
              NOTE: Clicking on this button will redirect you to your default email application. We
              <strong>STRONGLY RECOMMEND</strong> using a dummy account to send the email.
            </p>
            <v-btn
              class="default-button"
              @click="sendEmailButtonClicked"
              color="amber darken-3"
              :disabled="submitDisabled"
            >
              <span class="button-text">Send Email</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="2000">
      The text has been copied to the clipboard
      <v-btn color="amber darken-4" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <RepsDialog
      :isVisible="isRepsDialogVisible"
      :repsList="reps"
      :selectedReps="selectedReps"
      @updateSelectedReps="handleRepsSelection"
    />
  </v-container>
</template>

<script>
import { repsList } from "@/data/reps-list";
const RepsDialog = () => import("@/components/home/RepsDialog");
export default {
  name: "RepsTab",
  components: { RepsDialog },
  data() {
    return {
      // Snackbar
      snackbar: false,

      // Email contents
      subject: "",
      body: "",
      emailButtonMailTo: "",

      // Reps selection
      isRepsDialogVisible: false,

      reps: repsList,
      selectedReps: [],
      filters: [0, 1, 2],
      rowsPerPageItems: [5, 10, 15, -1],
      submitDisabled: true,

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
    subject: {
      handler() {
        this.submitDisabled = this.computedButtonDisabled;
      }
    },
    body: {
      handler() {
        this.submitDisabled = this.computedButtonDisabled;
      }
    },
    selectedReps: {
      handler() {
        this.submitDisabled = this.computedButtonDisabled;
      }
    }
  },
  computed: {
    computedButtonDisabled() {
      if (!this.selectedReps || this.selectedReps.length == 0) return true;
      if (!this.subject || this.subject == "") return true;
      if (!this.body || this.body == "") return true;
      return false;
    },
    computedHeaders() {
      return [
        {
          text: "Name",
          align: "start",
          value: "name"
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
    copyEmails() {
      this.$copyText(this.getEmails());
      this.snackbar = true;
    },
    copySubject() {
      this.$copyText(this.subject);
      this.snackbar = true;
    },
    copyBody() {
      this.$copyText(this.body);
      this.snackbar = true;
    },
    displayRepsSelection() {
      this.isRepsDialogVisible = true;
    },
    handleRepsSelection(selectedRepsLocal) {
      this.selectedReps = selectedRepsLocal;
      this.isRepsDialogVisible = false;
    },
    removeSelectedRep(rep) {
      this.selectedReps = this.arrayRemove(this.selectedReps, rep);
    },
    getEmails() {
      var emailString = "";
      this.selectedReps.forEach(rep => {
        rep.email.forEach(email => {
          if (emailString != "") {
            emailString += ";";
          }
          emailString += email;
        });
      });
      console.log(emailString);
      return emailString;
    },
    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    },
    sendEmailButtonClicked() {
      // console.log(this.filters);

      window.location.href =
        "mailto:" +
        this.getEmails() +
        "?subject=" +
        this.subject +
        "&body=" +
        this.body;
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
p.note {
  font-size: 13px;
}
p.subheading {
  margin-bottom: 0;
  margin-left: 2px;
  text-align: start;
}
.footnote-row {
  margin-top: 4px;
  margin-right: 2px;
}
.footnote-row span {
  font-size: 11px;
}
div.v-text-field__details {
  display: none;
}
div.v-input__slot {
  margin-top: 20px;
  margin-bottom: 0px;
}
</style>