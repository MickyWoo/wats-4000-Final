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
          > <button type="submit">Go</button></p>
      </form>

      <loading-spinner v-if="showLoading"></loading-spinner>
      <div
        class="displayCards"
        v-for="card in results.cards"
        :key="card.id"
      >

        <img
          :src="card.imageUrl"
          :alt="card.name"
        >
        <!-- i need to v-bind to apply images from results -->

      </div>

    </div>
    <div
      v-if="results.cards < 1"
      class="no-results"
    >
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
      messages: []
    };
  },

  methods: {
    getCard: function() {
      this.showLoading = true;
      (this.results = []),
        axios
          .get(`https://api.pokemontcg.io/v1/cards?`, {
            params: {
              name: this.cardName === "" ? "" : `${this.cardName}`
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
    }
  }
};
</script>


<style scoped>
.displayCards {
  display: inline;
  margin: 10px;
}
.displayCards:hover img {
  /* https://w3bits.com/css-image-hover-zoom/ */
  transition: transform 0.5s ease;
  transform: scale(1.5);
  display: inline;
  margin: 10px;
}
</style>