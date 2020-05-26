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

    <div
      class="displayCards"
      v-for="card in booster"
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
  name: "BoosterPack",
  components: {
    // loading: PokeBallSpinner
  },
  data() {
    return {
      //results = full list of cards
      results: [],
      //3 sepearte arrays to contain the rarity 
      commonCard: [],
      uncommonCard:[],
      rareCard: [],
      // a 4th array to assort random from each of the 3 assorted arrays by Rarity
      booster:[],
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
        .get(
          `https://api.pokemontcg.io/v1/cards?setCode=${this.selected}`
        )



        .then(response => {
          this.results = response.data;
          // this variable im calling c (which it knows is a card object because its coming from the allCards array) and only save the ones where c.rarity is common
          this.commonCard =  this.results.cards.filter(c => c.rarity === "Common");
          this.uncommonCard =  this.results.cards.filter(c => c.rarity === "Uncommon");
          this.rareCard =  this.results.cards.filter(c => c.rarity == "Rare" );

                     

 //  this.booster = (this.commonCard[randomCommon], this.uncommonCard[randomUncommon], this.rareCard[randomRare] );

        for ( let C = 0;   C < 7;  C++) {

         
           var  randomCommon = Math.floor((Math.random() * this.commonCard.length))
           this.booster.push(this.commonCard[randomCommon]);

      } for (let UC = 0; UC < 3; UC++) {

           var randomUncommon = Math.floor((Math.random() * this.uncommonCard.length))
            this.booster.push(this.uncommonCard[randomUncommon]);

      } for (let R = 0; R < 1; R++) {

           var randomRare = Math.floor((Math.random() * this.rareCard.length))
               this.booster.push(this.rareCard[randomRare]);
      }
      
     

          //taking all the random generated numbers 7 common,3uncommon, 1 rare or higher and placing them into each RARITY array to pull Amount into Booster Array 
          // and so i would pull 11 cards total and each # would get pulled and called by corresponding ID which is unique to each card. 
          // i push to fill in the spots booster [Rcommon,Rcommon,Rcommon,Rcommon,Rcommon,Rcommon,Rcommon,  Runcommon,Runcommon,Runcommon,   Rrare] < and then fill each random number with rarity

 
        
        })
     


        .catch(error => {
          this.errors.push(error);
        });
    },

    }
  }


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


        /*https://api.pokemontcg.io/v1/cards?setCode=base1&pageSize=7&rarity=common&random=true
        so i have 4 parameters there 
        setCode = set chosen...
        page size = card amount = 7
        rarity = common 
        random = true isnt working
    // shuffleDeck: function(results) {
    //   var currentIndex = results.length,
    //     temporaryValue,
    //     randomIndex;

    //   // While there remain elements to shuffle...
    //   while (0 !== currentIndex) {
    //     // Pick a remaining element...
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex -= 1;

    //     // And swap it with the current element.
    //     temporaryValue = results[currentIndex];
    //     results[currentIndex] = results[randomIndex];
    //     results[randomIndex] = temporaryValue;
    //   }

    //   return results;
    // },
        

       */
</script>

   

       

<style scoped>
.displayCards {
  display: inline;
  margin: 10px;
}
</style>