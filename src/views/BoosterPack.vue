<template>
  <div class="container">
    <div class="booster">
      <h1> Pokemon TCG Online Pack Simulator </h1>

      <p> Select a Set you would like to simulate a random 11 Card Booster Pack </p>
      <br>
      <p> Each pack is set to have 7 common, 3 uncommon, and 1 Rare As standard Booster Packs Contained. </p>
      <form v-on:submit.prevent="getCard">

        <select v-model="selected">
          <!--  https://vuejs.org/v2/guide/forms.html -->

          <option
            v-for="setChosen in setsAvaliable"
            :key="setChosen.id"
            v-bind:value="setChosen.value"
          >
            {{ setChosen.text }}
          </option>
        </select>
        <span> Selected: {{ selected }} </span>
        <button type="submit"> Open Booster Pack </button>
      </form>
      <!-- end booster -->

      <loading-spinner v-if="showLoading"></loading-spinner>

    </div>

    <div
      class="displayCards" 
      v-for="card in booster"
      :key="card.id"
    >

      <img
        v-on:click="inspect(card.id)"
        :src="card.imageUrl"
        :alt="card.name"
      >
      </div>
            <!-- i need to v-bind to apply images from results -->



      <div class="inspect" v-if="selectedID.length != 0 " > 
          <!-- needed the != because < or > caused some sort of false return on v-if statement -->
        <img
          :src="selectedID.card.imageUrlHiRes"
          :alt="selectedID.card.name"
          
        >
       <div> Name: {{selectedID.card.name}} </div>
        Set: {{selectedID.card.set}}
           
      </div>

    </div>

</template>

<script>
import axios from "axios";
import loadingSpinner from "@/components/loadingSpinner.vue";

export default {
  name: "BoosterPack",
  components: {
    "loading-spinner": loadingSpinner
  },
  data() {
    return {
      //results = full list of cards
      results: [],
      //3 sepearte arrays to contain each rarity
      commonCard: [],
      uncommonCard: [],
      rareCard: [],
      // a 4th array to assort random from each of the 3 assorted arrays by Rarity
      booster: [],

      showLoading: false,
      errors: [],
      selected: "",

      selectedID: [],
      setsAvaliable: [
        { text: "Base Set", value: "base1" },
        { text: "Jungle", value: "base2" },
        { text: "Fossile", value: "base3" },
        { text: "Team Rocket", value: "base5" },
        { text: "Gym Heros", value: "gym1" },
        { text: "Gym Challenge", value: "gym2" }
      ]
    };
  },

  methods: {
    inspect: function(selectedID) {
      axios
        .get(`https://api.pokemontcg.io/v1/cards/${selectedID}`)
        .then(response => {
          this.selectedID = response.data;
          
        });
    },

    getCard: function() {
      this.showLoading = true;
      this.booster = []; // reset booster to empty slate for new pack opening.
      this.selectedID = [];

      axios
        .get(`https://api.pokemontcg.io/v1/cards?setCode=${this.selected}`)

        .then(response => {
          this.results = response.data;
          this.showLoading = false;

          // this variable im calling c (which it knows is a card object because its coming from the allCards array) and only save the ones where c.rarity is common
          this.commonCard = this.results.cards.filter(
            c => c.rarity === "Common"
          );
          this.uncommonCard = this.results.cards.filter(
            c => c.rarity === "Uncommon"
          );
          this.rareCard = this.results.cards.filter(c => c.rarity == "Rare");

          //  this.booster = (this.commonCard[randomCommon], this.uncommonCard[randomUncommon], this.rareCard[randomRare] );

          for (let C = 0; C < 7; C++) {
            var randomCommon = Math.floor(
              Math.random() * this.commonCard.length
            );
            this.booster.push(this.commonCard[randomCommon]);
          }
          for (let UC = 0; UC < 3; UC++) {
            var randomUncommon = Math.floor(
              Math.random() * this.uncommonCard.length
            );
            this.booster.push(this.uncommonCard[randomUncommon]);
          }
          for (let R = 0; R < 1; R++) {
            var randomRare = Math.floor(Math.random() * this.rareCard.length);
            this.booster.push(this.rareCard[randomRare]);
          }
        })

        .catch(error => {
          this.errors.push(error);
          this.showLoading = false; // this.showLoading = false outside of the tryCatch block, so no matter what it is registering showLoading as false
        });
    }
  }
};
</script>

 

<style scoped>
.hide{
  display:none;
}
.displayCards {
  display: inline-block;
  margin: 10px;
}
.displayCards img {
  display: inline-block;
  margin: 10px;
  width: 250px;
}
.inspect img {
  display: flex;
  align-content: center;
  margin: 10px;
  width: 400px;
}
</style>