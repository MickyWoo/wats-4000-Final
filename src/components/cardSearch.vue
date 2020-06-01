<template>
  <div class="search">
    <h> Pokemon Card Search </h>
    <form v-on:submit.prevent="getCard">
      <p>Enter card name: <input
          type="text"
          v-model="cardName"
          placeholder="Squirtle"
        > <button type="submit">Go</button></p>
    </form>
    <!-- <load-spinner v-if="showLoading"></load-spinner> -->
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

</template>

<script>
import axios from "axios";

export default {
  name: "cardSearch",
  components: {},
  data() {
    return {
      results: [],
      cardName: "",
      //  showLoading: false,
      messages: [],
    };
  },

  methods: {
    getCard: function() {
      //  this.results = [],  //reset
      //   this.showLoader = true;
      axios.get(`https://api.pokemontcg.io/v1/cards?`, {
        params: {
          name: this.cardName
        }
      })
        .then(response => {
          this.results = response.data;
          // this.showLoading = false;
        })
        .catch(error => {
          this.messages.push({
            type: "error",
            text: error.message
          });
        //   this.showLoading = false;
        });
    }
  }
};
</script>


<style scoped>
.displayCards{
 
  display: inline;
  margin: 10px;
   
   transition: transform .5s ease;
  
}
.displayCards:hover img{
     transform: scale(1.5);
      display: inline;
  margin: 10px;
}

</style>