<template>
  <div>
    <button v-if="!isGameStarted" @click="startGame">START GAME</button>
    <button v-if="isGameStarted" @click="resetGame">RESET GAME</button>
    <div v-if="isGameStarted" class="container">
      <h2 v-if="showWinner" class="show-winner">Winner is: {{ winner }}</h2>
      <h2 v-if="!showWinner" >Current player: {{ currentPlayer }}</h2>
      <!--
      <button @click="checkGameState">console.log array with game state</button>
      -->
      <div class="game-area">
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[0].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[1, 3]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[1].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[2, 3]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[2].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[3, 3]">
        </cell>

        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[3].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[1, 2]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[4].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[2, 2]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[5].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[3, 2]">
        </cell>

        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[6].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[1, 1]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[7].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[2, 1]">
        </cell>
        <cell @updateValue="updateValue" @changePlayer="togglePlayer"
        @updateCounter="updateCounter()"
        :winner="this.cells[8].winner" 
        :gameFinished="gameFinished" :player="currentPlayer" :coords="[3, 1]">
        </cell>
      </div>
    </div>
  </div>
</template>
<script>
import Cell from '@/components/Cell.vue'

export default {
  name: 'Playground',
  data(){
    return{
      isGameStarted: false,
      gameFinished: false,
      showWinner: false,
      currentPlayer: 'X',
      counter: 0,
      cells:[
        {coords: [1, 3], value: "", winner: false},
        {coords: [2, 3], value: "", winner: false},
        {coords: [3, 3], value: "", winner: false},
        {coords: [1, 2], value: "", winner: false},
        {coords: [2, 2], value: "", winner: false},
        {coords: [3, 2], value: "", winner: false},
        {coords: [1, 1], value: "", winner: false},
        {coords: [2, 1], value: "", winner: false},
        {coords: [3, 1], value: "", winner: false}
      ]
    }
  },
  methods:{
    //console.log coords and values of every cell
    // checkGameState: function(){
    //   for(let cell of this.cells){
    //     console.log(cell.coords);
    //     console.log(cell.value)
    //   }
    // },

    //Start a new game
    startGame: function(){
      this.currentPlayer = "X";
      this.isGameStarted = true;
      this.gameFinished = false;
      this.showWinner = false;
      this.counter = 0;
      for(let cell of this.cells){
        cell.winner=false
      }
    },
    //check for draw
    updateCounter: function(){
      if(this.counter < 9){
        this.counter += 1;
      } else {
        for(let cell of this.cells){
          cell.winner=true
        }
        this.endGame("no1! It's a draw!")
      }
    },
    //Reset game
    resetGame: function(){
      this.isGameStarted = false;
      for(let cell of this.cells){
          cell.value="";
      }
    },
    //Toggle player between X and O
    togglePlayer: function(){
      this.currentPlayer === "X" ? this.currentPlayer = "O" : this.currentPlayer = "X"
    },
    //Assign value to current selection in data.cells[].value
    updateValue(coords, value){
      for(let cell of this.cells){
        if(cell.coords[0] == coords[0] 
        && cell.coords[1] == coords[1]){
          cell.value=value;
        }
      }
      this.checkWinner()
    },
    //Check winning conditions
    checkWinner: function(){
      let checkValue = this.checkValue
      //horizontal check
      for(let i=1; i<4; i++){
        if(checkValue(1, i) != "" 
        && checkValue(1, i) == checkValue(2,i) 
        && checkValue(1, i) == checkValue(3, i)){
          this.highlightWinner([1, i]);
          this.highlightWinner([2, i]);
          this.highlightWinner([3, i]);
          this.endGame(checkValue(1, i));
        }
      }
      //vertical check
      for(let i=1; i<4; i++){
        if(checkValue(i, 1) != "" 
        && checkValue(i, 1) == checkValue(i, 2) 
        && checkValue(i, 1) == checkValue(i, 3)){
          this.highlightWinner([i, 1]);
          this.highlightWinner([i, 2]);
          this.highlightWinner([i, 3]);
          this.endGame(checkValue(i, 1));
        }
      }
      //diagonals check
        if(checkValue(1, 1) != "" 
        && checkValue(1, 1) == checkValue(2, 2) 
        && checkValue(1, 1) == checkValue(3, 3)){
          this.highlightWinner([1, 1]);
          this.highlightWinner([2, 2]);
          this.highlightWinner([3, 3]);
          this.endGame(checkValue(1, 1));
        } 
        else if(checkValue(3, 1) != "" 
        && checkValue(3, 1) == checkValue(2, 2) 
        && checkValue(3, 1) == checkValue(1, 3)){
          this.highlightWinner([3, 1]);
          this.highlightWinner([2, 2]);
          this.highlightWinner([1, 3]);
          this.endGame(checkValue(3, 1));
        }  
    },
    //Check value of given cell
    checkValue: function(x, y){
      for(let cell of this.cells){
        if(cell.coords[0] == x && cell.coords[1] == y){
          return cell.value;
        }
      }
    },
    //Freeze board and layout winner
    endGame: function(winner){
      this.gameFinished = true
      this.showWinner = true
      this.winner = winner
    },
    highlightWinner: function(coords){
      for(let cell of this.cells){
        if(cell.coords[0] == coords[0] && cell.coords[1] == coords[1]){
          cell.winner=true;
        }
      }
    }
  },
  components: {
    Cell
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 25px;
}
.game-area{
  display: grid; 
  grid: repeat(3, 75px) / repeat(3, 75px);
  gap: 1px 1px;
}
.game-area:hover{
  cursor: pointer;
}
.show-winner{
  color: #42b984;
  font-size: 2em;
}

button{
  background-color: #42b984; /* Green */
  border: none;
  border-radius: 0.75em;
  color: white;
  padding: 1em 1.5em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
}
</style>