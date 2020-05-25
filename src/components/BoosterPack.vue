<template>
  <div class="container">
    <div class="booster">
      <h1> Pokemon TCG Online Pack Simulator </h1>

      <p> Select a Set you would like to simulate a random 11 Card Booster Pack </p>
      <form v-on:submit.prevent="getCard">

        <select v-model="selected">
          <!--  https://vuejs.org/v2/guide/forms.html -->

          <option
            v-for="setChosen in setsAvaliable"
            :key="setChosen"
            v-bind:value="setChosen.value"
          >
            {{ setChosen.text }}
          </option>
        </select>
        <span> Selected: {{ selected }} </span>
        <button type="submit"> Open Booster Pack </button>
      </form>
      <!-- end booster -->
    </div>

    <div class="displayCards" v-for="card in results.cards" :key="card.id"  >
    
      
          <img :src="card.imageUrl"  :alt="card.name" > 
          <!-- i need to v-bind to apply images from results -->
       </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "BoosterPack",
  components: {
    // loading: PokeBallSpinner
  },
  data() {
    return {
      results: [],
      errors: [],
      selected: "",
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
    getCard: function() {
      axios
        .get(`https://api.pokemontcg.io/v1/cards?setCode=${this.selected}`)
        

        .then(response => {
          console.log("i found some errors ");
          this.results = response.data;
        })

        .catch(error => {
          this.errors.push(error);
        });
    }
  }
};

//https://api.pokemontcg.io/v1/sets/xy1 may have to use ths one
/* basically i have to import a diff vue specifically for Booster of 11 Cards. to grab 7 common, 3 cummon and 1 Rare or higher. and to do that 
       i need it via the get from rarity search of the "set" selected which is by "set Code" based on API. 
       a random number selector, and they have and ID # attached when retreiving so i can maybe based it off that specifically named "number" 
       
      based on the set chosen, the response data is in Array under "cards" and i want the "rarity" so i just select that which i think is cards.rarity="common"


      so the thought is that i have to split this up into 3 views or methods 
      1st i need to grab the user input of SELECTED set  (which is a code id)
      https://api.pokemontcg.io/v1/cards?setCode=`${SelectedSet}`  

      and then another method that take that code ID and take the loaded states 
      which i should have Rarity: [],
      number:(),
      so can grab 7 common, 3 cummon and 1 Rare or higher
      and the Number which is to allow number .random?

      and then i push.rarity:common[6].random???? something like that..... or i have to find common within it and set it into a 
      common:[] array and then choose random from that
      
      so i have 3 new arrays 
      common:[]
      uncommon:[]
      rare:[]

      <CardViewer v-for="item in results.cards" :key="item.id" :name="item.name" :image="item.imageUrl"></CardViewer>

      so item.rarity.common.shuffle[6]???? if i wanted to choose 7 random common cards


       */
</script>

   

       

<style scoped>

.displayCards {
  display: inline;
  margin: 10px;
 
}
</style>