interface Entity{
  life: number,
  strength : number,
  attack : number,
  move():void
  strike():void
}

abstract class CreepMeleEntity implements Entity {
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

  abstract design():void
}


abstract class CreepRangeEntity implements Entity {
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

  abstract design():void
}


class DireCreepMele extends CreepMeleEntity {
  constructor(){
    super()
  }

  design(){
    console.log('Dire Creep Mele Design')
  }
}

class RandiantCreepMele extends CreepMeleEntity {
  constructor(){
    super()
  }

  design(){
    console.log('Radiant Creep Mele Design')
  }
}

class RandiantCreepRange extends CreepRangeEntity {
  design(){
    console.log('Radiant Creep Range Design')
  }
}

class DireCreepRange extends CreepRangeEntity {
  design(){
    console.log('Dire Creep Range Design')
  }
}



interface AbstractFactory {
  createCreepMele():CreepMeleEntity
  createCreepRange():CreepRangeEntity
}

class DireMapFactory {
  createCreepMele(){
    return new DireCreepMele()
  }

  createCreepRange(){
    return new DireCreepRange()
  }
}

class RadiantMapFactory {
  createCreepMele(){
    return new RandiantCreepMele()
  }

  createCreepRange(){
    return new RandiantCreepRange()
  }
}

class Game1VS1 {
  constructor( private alliesFactory:AbstractFactory, private enemiesFactory : AbstractFactory){
    
  }
  createAlly(){
    const allyCrepMele = this.alliesFactory.createCreepMele()
    allyCrepMele.design()
    const allyCrepRange = this.alliesFactory.createCreepRange()
    allyCrepRange.design()
  }

  createEnemy(){
    const enemyCrepMele = this.enemiesFactory.createCreepMele()
    enemyCrepMele.design()
    const enemyCrepRange = this.enemiesFactory.createCreepRange()
    enemyCrepRange.design()
  }
}

const game1VS1 = new Game1VS1(new RadiantMapFactory(),new DireMapFactory())
console.log('Create allies')
game1VS1.createAlly()
console.log('Create enemies')
game1VS1.createEnemy()

