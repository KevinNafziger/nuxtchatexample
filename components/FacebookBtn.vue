<template>
  <button content="Click to search"
     class="tagbtn gardient-button" v-on:click="setFacebook()"  style="margin-left:1px;margin-top:5px;margin-bottom:10px" >
      Facebook Data
    </button>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {mapState} from 'vuex';


export default {
  data: () => ({
    text: "",
    }
  ),
  methods: {
    ...mapActions(["getFacebookData", "getTwitterData",]),
    setFacebook() {
       this.getFacebookData();
    },
    setTwitter() {
       this.getTwitterData();
    },
   
  },

  computed: {

     ...mapState({

        facebookData: state => state.facebookData,
        twitterData: state =>
        state.twitterData,
     }),
   },
}
</script>

<style scoped>

   .tagbtn {
   background-color: #4f81bd !important;
   color: white !important;
   padding: 1px 5px;
   border-radius: 10px;
 }
.text-field{
  height: 30px !important;
}

.tagbtn {
  padding: 3px 5px !important;
  border-radius: 3px !important;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  display: inline-flex;
  text-decoration: none !important;
  box-shadow: 0px 0px 5px -1px gray !important;
}
.gardient-button {
  margin-top:10px;
  background: #4f81bd !important;
}
i
  button#section-10 {
    margin-left: 1px;
    margin-top: 0px !important;
    margin-bottom: 10px;
    padding: 3px;
    border-radius: 3px;
    height: fit-content;
    position: inherit;
  }
input {
      background: rgba(105,105,105,0.07059);
}
h3, h2 {
  color: #4f81bd !important;
}
.tagbtn:active {
  background: #474747 !important;
}
</style>
