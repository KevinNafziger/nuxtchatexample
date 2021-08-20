<template>

    <button content="Click to search"
     class="tagbtn gardient-button" v-on:click="setTwitter()"  style="margin-left:65px;margin-top:5px;margin:10px;" >
      Twitter Data
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
    ...mapActions(["getFacebookData", "getTwitterData", ]),
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
.search-bar-div {
  margin-left:10px;
  margin-Right:10px;
}
.w-col-8{
  width: 90%;
}
@media screen and (max-width:1800px) {
  .w-col-8 {
    width: 70% !important;
  }
}
@media screen and (max-width:900px) {
  .text-field {
      width: 100%;
  }
  .w-col-8 {
    width: 100% !important;
  }
  #section-10{
    width: 100% !important;
  }
}
.tag-search-div {
  width: 90% ;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
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
i.glyphicon {
  color: #ffffff !important;
  heigth: 50px !important;
}
  #section-10 {
    background-image: linear-gradient(92deg, rgba(20, 160, 253, .82), rgba(20, 160, 253, 0.82));
width: 80px;
color: white;
  }
  button#section-10 {
    margin-left: 100px;
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
