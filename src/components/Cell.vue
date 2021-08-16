<template>
  <div> 
    <div @click.once="selectCell" class="cell">
      <div v-if="winner" :class="getWinner()"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value: ""
    }
  },
  props:[
    "player",
    "coords",
    "gameFinished",
    "winner"
  ],
  methods:{
    selectCell(){
      if(!this.gameFinished){
        this.$el.classList.add(this.player);
        this.assignValue();
        this.$emit('updateCounter')
      }
    },
    assignValue(){
      this.value = this.player;
      this.trigChangePlayer();
    },
    trigChangePlayer(){
      this.$emit('changePlayer');
      this.$emit('updateValue', this.coords, this.value)
    },
    getWinner(){
      return(this.value == 'X'? "XW" : "OW")
    }
  }
}
</script>

<style scoped>
.cell{
  width: 100%;
  height: 100%;
  border: 2px solid black;
}
.X{
  background: url('../assets/Xicon.svg');
  background-repeat: no-repeat;
  background-size:75%;
  background-position: center;
}
.O{
  background: url('../assets/Oicon.svg');
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center;
}
.XW{
  background: url('../assets/XiconGreen.svg');
  background-repeat: no-repeat;
  background-size:80%;
  background-position: center;
  width: 95%;
  height: 95%;
}
.OW{
  background: url('../assets/OiconGreen.svg');
  background-repeat: no-repeat;
  background-size:80%;
  background-position: center;
  width: 95%;
  height: 95%;
}
</style>