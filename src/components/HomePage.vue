<template>
 <container>
  <div class="Left">
<img src="src/assets/fire.jpg" alt="fire" >
  <router-link to="/BoosterPack">  <button>Booster Pack Simulation</button></router-link>
  </div>

  <div class="Right">

<img src="src/assets/water.jpg" alt="water" >
       <router-link to="/CardSearch">  <button>Pokemon Card Search </button></router-link>

    </div>
 </container>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
