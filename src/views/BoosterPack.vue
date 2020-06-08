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
      <!-- end Search -->

      <router-link to="/cardSearch">Try Searching for A specific card</router-link>

      <loading-spinner v-if="showLoading"></loading-spinner>
    </div>

 <!-- displayCards Div to allow hiding when INSPECT is clicked on -->
    <div v-if='displayCards'>
      <transition-group name='fade' tag="div" appear>
        <div
          class="boosterCards "
          v-for="card in booster"
          :key="card.id"
        >  
    <div class="Overlay" v-on:click="inspect(card.id)"> <img class="icon" src="../assets/magnify.png" alt="magnify-icon"><p> INSPECT </p> </div>   

          <!-- inspect(card.id) to dump into anoter api to fetch card id -->
          <img
            class="cards"
            :src="card.imageUrl"
            :alt="card.name"
          >
        </div>
        <!-- i need to v-bind to apply images from results -->
      </transition-group>
    </div>

    <!-- BoosterPack End -->

    <!-- Inspection Card -->
    <div class="inspect" v-if="selectedID.length != 0 ">
      <!-- needed the != because < or > caused some sort of false return on v-if statement -->
      <button
        class="closeButton"
        v-on:click="close" >close</button>

      <transition
        name="fade"
        tag="img"
        appear
      >
        <img
          :src="selectedID.card.imageUrlHiRes"
          :alt="selectedID.card.name"
        >
      </transition>

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
      displayCards: true,  // initial set to true until clicked on to hide for Inspect
      errors: [],
      selected: "",

      selectedID: [],
      setsAvaliable: [
        { text: "Base Set", value: "base1" },
        { text: "Jungle", value: "base2" },
        { text: "Fossile", value: "base3" },
        { text: "Team Rocket", value: "base5" },
        { text: "Gym Heros", value: "gym1" },
        { text: "Gym Challenge", value: "gym2" },
        { text: "Neo Genesis", value: "neo1" },
        { text: "Neo Discovery", value: "neo2" },
        { text: "Neo Revelation", value: "neo3" },
        { text: "Neo Destiny", value: "neo4" }
      ]
    };
  },

  methods: {
    close: function() {
      // when inspecting to hide rest of cards
      this.displayCards = true;
      this.selectedID = []; // reset selected card for new selection
    },
    inspect: function(selectedID) {
      // object pulls from card.id in method above
      axios
        .get(`https://api.pokemontcg.io/v1/cards/${selectedID}`)
        .then(response => {
          this.selectedID = response.data;
          this.displayCards = false; // hide booster pack and just show SelectedCard
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
.boosterCards {
  position: relative;
  display: inline-block;
  margin: 10px;
}
.boosterCards img {
  display: inline-block;
  margin: 10px;
  width: 250px;
}


.inspect img {
  position: relative;
  display: inline-block;
  align-content: center;
  margin: 10px;
  width: 400px;
  
}

.Overlay{  /*https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_overlay_title */
  position: absolute; /* to set overlay of text */

  opacity: 0;
 transition: .5s ease;
}
.boosterCards:hover .Overlay{
  
  opacity: 1;
   transition: opacity 1s;
   /* width: 100%;
    height: 100%; */
  background: rgba(238, 238, 238, 0.5); /* see-through */
  font-size: 25px;
  align-content: center;

}
.icon{
  width:30%;
  height: 20%;
}


</style>