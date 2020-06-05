<template>
  <div>
    <div class="messages">
      <message-container v-bind:messages="messages"> </message-container>
    </div>

    <div class="search">

      <h1> Pokemon Card Search </h1>
      <form v-on:submit.prevent="getCard">
        <p>Enter card name: <input
            type="text"
            v-model="cardName"
            placeholder="Squirtle"
          >

          <button type="submit">Go</button></p>

      </form>

      <loading-spinner v-if="showLoading"></loading-spinner>

      <div class="displayCard" >

        <div
          class="Cards "
          v-for="card in results.cards"
          :key="card.id"
        >
        


         
          <img 
            :src="card.imageUrl"
            :alt="card.name"
          >
            <div> Set:  {{card.set}} </div>
          <!-- i need to v-bind to apply images from results -->

        </div>

      </div>

    </div>

    <div
      class="no-results"
      v-if="results.cards < 1"
    >
      <!-- set to < 1 to avoid inital page load error results === 0  -->
      <h2>No cards Found</h2>
      <p>Please adjust your search</p>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";
// Note: vue2-animate is added using the require statement because it is a CSS file
require("vue2-animate/dist/vue2-animate.min.css"); //npm install --save vue2-animate

import MessageContainer from "@/components/MessageContainer.vue";

export default {
  name: "cardSearch",
 

  components: {
    "loading-spinner": loadingSpinner,
    "message-container": MessageContainer
  },
  data() {
    return {
      results: [],
      cardName: "",
      showLoading: false,
      messages: [],

    };
  },

  methods: {
    getCard: function() {
      this.showLoading = true;
      this.results = [];
      if (this.cardName !== "") {
        // check if search has any text
        axios
          .get(`https://api.pokemontcg.io/v1/cards?`, {
            params: {
              name: this.cardName
            }
          })
          .then(response => {
            this.results = response.data;
            this.showLoading = false;
    
          })
          .catch(error => {
            this.messages.push({
              type: "error",
              text: error.message
            });
            this.showLoading = false;
          });
      } else {
        // to notify user that input box is 'EMPTY'
        this.results.cards = 0;
        this.showLoading = false;
      }
    }
  }
};
</script>


<style scoped>
.Cards {
  display: inline-block;

  margin: 10px;
}
.Cards img{
  width: 250px;
}
.Cards:hover img {
  /* https://w3bits.com/css-image-hover-zoom/ */
  transition: transform 0.5s ease;
  transform: scale(1.5);
  display: inline-block;  /* inline-block is key to keep uniform for each card with set name*/
  margin: 10px;
}
</style>