<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
  >
    <v-col cols="auto">
      <v-card
        min-width="290"
        color="#d3d3d3"
      >
        <Snackbar
          v-model="snackbar"
          :text="message"
        />

        <v-card-title>
          <h2>Feed Automator</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="isValid"
            lazy-validation
            @submit.prevent="submit"
          >
          <input type="hidden" v-model="user.name" value="Data Helper" required>
            
            <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-3"
              type="submit"
            >
              Start
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/Snackbar";
import messageDict from "@/lib/messageDict";

export default {
  name: "Home",
  layout: "login",
  components: {
    Snackbar,
  },
  data: () => ({
    isValid: true,
    user: {
      name: "",
      room: "feed",
      typingStatus: false,
    },
    nameRules: [
      v => !!v || "A display name is required",
      v => (v && v.length <= 16) || "Display Name should be less than 16 characters",
    ],
    snackbar: false,
  }),
  computed: {
    message() {
      const { message } = this.$route.query;
      return messageDict[message] || "";
    },
  },
  mounted() {
    this.snackbar = !!this.message;
  },

  methods: {
    ...mapActions(["createUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.createUser(this.user);
        this.$router.push("/chat");
      }
    },
  },

  head: {
    title: "Feed Automator",
  },
};
</script>
