<template>
  <v-container>
    <!-- <v-form ref="form"> -->
    <v-container fluid>
      <v-row justify="center" no-gutters class="row-item">
        <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
          <v-card outlined class="recipients-box pa-2 mx-auto">
            <p class="subheading">Recipient</p>
            <h4>Rep. Erico Aristotle C. Aumentado</h4>
            <p>House Committee Chairperson on Science and Technology</p>
          </v-card>
          <v-row class="footnote-row"></v-row>
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters>
        <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
          <v-text-field v-model="name" label="Your Name" outlined></v-text-field>
          <v-row class="footnote-row" />
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters class="row-item">
        <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
          <v-text-field v-model="subject" label="Subject" outlined></v-text-field>
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
          <v-textarea v-model="body" label="Body" outlined rows="9"></v-textarea>
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
        <v-col cols="12" xl="12" lg="12" md="12" sm="8" xs="8">
          <p
            class="note"
          >NOTE: Clicking on this button will redirect you to your default email application.</p>
          <v-btn
            class="default-button"
            @click="sendEmailButtonClicked"
            color="amber darken-3"
            :disabled="submitDisabled"
          >
            <span class="button-text">Send Email</span>
          </v-btn>
          <v-btn
            style="margin-left: 10px"
            class="default-button"
            @click="contactViaFb"
            color="blue darken-3"
            :disabled="submitDisabled"
          >
            <span class="button-text">Contact via Facebook</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-form> -->
    <v-snackbar v-model="snackbar" :timeout="2000">
      The text has been copied to the clipboard
      <v-btn color="amber" text @click="snackbar = false">Close</v-btn>
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
      name: "",
      subject: "Withdraw your 'YES' vote to the Anti-Terror Bill (HB 6875)",
      body: `I am a member of the PH science and tech community, and as our representative in the legislature, I demand that you protect the rights of the Filipinos to freedom of speech and withdraw your 'YES' vote on the Anti-Terror Bill (HB 6875).\n\n<Your Name>`,
      emailButtonMailTo: "",

      // Reps selection
      isRepsDialogVisible: false,

      reps: repsList,
      selectedReps: [],
      filters: [0, 1, 2],
      rowsPerPageItems: [5, 10, 15, 50],
      submitDisabled: false,

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
    name: {
      handler() {
        this.body = `I am a member of the PH science and tech community, and as our representative in the legislature, I demand that you protect the rights of the Filipinos to freedom of speech and withdraw your 'YES' vote on the Anti-Terror Bill (HB 6875).\n\n${this
          .name ?? ""}`;
      }
    }
  },
  computed: {
    computedButtonDisabled() {
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
    clearReps() {
      this.selectedReps = [];
    },
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
      // console.log(escape(this.body));

      window.location.href =
        "mailto:?bcc=" +
        "ericoaristotle.aumentado@house.gov.ph" +
        "&subject=" +
        escape(this.subject) +
        "&body=" +
        escape(this.body);
    },
    contactViaFb() {
      // console.log(escape(this.body));
      window.open("https://fb.com/aris.aumentado/", "_blank");
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
  margin-bottom: 20px;
}
.footnote-row span {
  font-size: 11px;
}
div.v-text-field__details {
  display: none;
}
div.v-input__slot {
  margin-bottom: 0px;
}
.recipients-box {
  overflow-y: auto;
  text-align: start;
}
.recipients-box h4,
.recipients-box p {
  margin-left: 2px;
}
.recipients-box h4 {
  margin-top: 6px;
}
/* .v-text-field input {
  font-size: 0.95em;
}
.v-textarea input {
  font-size: 0.95em;
} */
</style>