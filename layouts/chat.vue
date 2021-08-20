<template>
  <v-app style="background: #FFFFFF;">
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-break-point="650"
      color="$accent"
    >
      <br><br>
      <h3>Feed Automator: </h3><br>

      <p>Get instant updates from the top social media sites. </p>
     
        
        
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#424242"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        Feed
        <v-chip color="grey">
          Automator
        </v-chip>
      </v-toolbar-title>
        
      <v-spacer />
  
      <v-btn
        icon
        class="mx-1"
        @click="exit"
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        style="height: 70%;"
      >
      <br><br>
        Welcome to <i>Feed Automator</i>, the  enterprise SaaS tool that keeps you plugged-in.<br>
        Click the button below of the feed you wish to retrieve. 
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ChatLayout",
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapState(["user", "users"]),
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
  },
  methods: {
    ...mapActions(["joinRoom", "leftRoom"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
  },
};
</script>
