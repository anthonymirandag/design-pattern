interface Entity{
  life: number,
  strength : number,
  attack : number,
  move():void
  strike():void
}

class CreepMele implements Entity {
  life : number = 250 ;
  strength : number = 20;
  attack : number = 30;
  
  constructor(){
  }

  move(){
    console.log('Move CreepMele')
  }

  strike(){
    console.log('Atack CreepMele')
  }
}


class CreepRange implements Entity {
  life : number = 200 ;
  strength : number = 18;
  attack : number = 50;
  constructor(){

  }
 
  move(){
    console.log('Move CreepRange')
  }
 
  strike(){
    console.log('Atack CreepRange')
  }

}


class CreepAncestral implements Entity {
  life : number = 500 ;
  strength : number = 30;
  attack : number = 100;
  
  constructor(){

  }
  
  move(){
    console.log('Move CreepAncestral')
  }
  
  strike(){
    console.log('Atack CreepAncestral')
  }
}

interface EnemyFactory {
  createEnemy():Entity
}

class FirstLevelEnemyFactory implements  EnemyFactory{
  createEnemy():Entity {
    const randomEnemy = Math.random()
    if(randomEnemy <= 0.4){
       return new CreepMele()
    }else{
      if(randomEnemy <= 0.8 ){
        return new CreepRange()
      }else{
        return new CreepAncestral()
      }
    }
  }
}


class SecondLevelEnemyFactory implements  EnemyFactory{
  createEnemy():Entity {
    const randomEnemy = Math.random()
    if(randomEnemy <= 0.3){
       return new CreepMele()
    }else{
      if(randomEnemy <= 0.3 ){
        return new CreepRange()
      }else{
        return new CreepAncestral()
      }
    }
  }
}


class ThirdLevelEnemyFactory implements  EnemyFactory{
  createEnemy():Entity {
    const randomEnemy = Math.random()
    if(randomEnemy <= 0.2){
       return new CreepMele()
    }else{
      if(randomEnemy <= 0.2 ){
        return new CreepRange()
      }else{
        return new CreepAncestral()
      }
    }
  }
}

class GameBatleCrepps{
  constructor(private enemyFactory: EnemyFactory){
  }
  gameLogic(){
    // ...
    //more logic 
    for(let i = 0; i< 10 ; i++ ){
      let enemy = this.enemyFactory.createEnemy()
      enemy.move()
      enemy.strike()
    }
  }
}


// Game 
console.log('Start Game')
console.log('First Level')
let game = new GameBatleCrepps(new FirstLevelEnemyFactory())
game.gameLogic()
console.log('Second Level')
game = new GameBatleCrepps(new SecondLevelEnemyFactory())
game.gameLogic()
console.log('Third Level')
game = new GameBatleCrepps(new ThirdLevelEnemyFactory())
game.gameLogic()
console.log('End Game')