<template>
  <div class="container">
    
    <img class="frontPage"
      img-fluid
      src="../assets/Logo+Arrows.png"
      alt="logo"
    >

    <div class="buttonContainer">
      <!-- <div class="col">  im prob just gonna combine the two fire/water image and jsut set as background so i hcan have buttons in front </div> -->
      <div class="Left">

        <router-link to="/BoosterPack"> <button class="button">Booster Pack Simulation</button></router-link>
      </div>

      <div class="Right">

        <router-link to="/CardSearch"> <button class="button">Pokemon Card Search </button></router-link>

      </div>
    </div>
  </div>

</template>

<script>
//  import axios from 'axios';
export default {
  name: "HomePage",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display:block;
}


.buttonContainer{
  display:flex;
 
  justify-content: center;
  align-items: center;
  margin-left: 10%;

}
.button {
  margin: 20px;
  width: 400px;
  height: 150px;
}
</style>
