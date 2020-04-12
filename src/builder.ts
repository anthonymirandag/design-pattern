
// Dos clases no necesariamente de una misma interface. Se abstre los metodos de implementacion simialeres
class House {
  foundations: string[] =[];
  floors: string[] = [];
  walls : string[] = [];
  ceils : string[] = [];
  windows : string[] = [];
  doors : string [] = [];  
  stairs: boolean  = false;
  constructor(){
  }

  setFoundations(foundations:number){
    for (let i = 0; i < foundations; i++) {
      this.foundations.push('Base of iron')
    }
   }
   
  setFloor(floor:string){
   this.floors.push(floor)
  }
  setWalls(walls:string[]){
    this.walls.push(...walls)
  }
  setCeil(ceil:string){
    this.ceils.push(ceil)
  }
  setWindows(window:string){
    this.windows.push(window)
  }
  setDoors(door:string){
    this.doors.push(door)
  }
  setStairs(){
    this.stairs = true
  }
}


class Castle {
  foundations: string[] =[];
  floors: string[] = [];
  walls : string[] = [];
  ceils : string[] = [];
  windows : string[] = [];
  doors : string [] = [];  
  towers : string [] = [];
  stairs: boolean  = false;
  constructor(){
  }

  setFoundations(foundations:number){
    for (let i = 0; i < foundations; i++) {
      this.foundations.push('Base of stone ')
    }
   }
   
  setFloor(floor:string){
   this.floors.push(floor)
  }
  
  setWalls(walls:string[]){
    this.walls.push(...walls)
    const numTowers = walls.length % 2 + walls.length 
    this.setTowers(numTowers)
  }
  setTower(tower:string){
    this.towers.push(tower)
  }
  setTowers(towers:number){
    for (let i = 0; i < towers; i++) {
      this.setTower('Tower of stone ')
    }
  }

  setCeil(ceil:string){
    this.ceils.push(ceil)
  }

  setWindows(window:string){
    this.windows.push(window)
  }

  setDoors(door:string){
    this.doors.push(door)
  }


  setStairs(){
    this.stairs = true
  }
}

// Se crea un builder para cada una

interface Builder {
  setFoundations(foundations:number): void
  setFloor():void
  setWalls(walls:number):void
  setCeil():void
  setWindows(window:string):void
  setDoors(door:string):void
  setStairs():void
}


class HouseBuilder implements Builder {
  house : House
  constructor(){
    this.house = new House()
  }

  reset(){
    this.house = new House()
  }
  
  setFoundations(foundations:number){
    this.house.setFoundations(foundations)
  }

  setFloor(){
    this.house.setFloor('Wooden floor')
  }

  setWalls(walls:number){
    const wallsBrick = []
    for (let i = 0; i < walls; i++) {
      wallsBrick.push('Brick wall')
    }
    this.house.setWalls(wallsBrick)
  }

  setCeil(){
    this.house.setCeil('Wood roof')
  }

  setWindows(window:string){
    this.house.setWindows(window)
  }
 
  setDoors(door:string){
    this.house.setDoors(door)
  }

  setStairs(){
   this.house.setStairs()
  }
  
  getProduct(){
    const house = this.house
    this.reset()
    return house
  }
}


class CastleBuilder implements Builder {
  house : Castle
  constructor(){
    this.house = new Castle()
  }

  reset(){
    this.house = new Castle()
  }

  setFoundations(foundations:number){
    this.house.setFoundations(foundations)
  }

  setFloor(){
    this.house.setFloor('Rock floor')
  }

  setWalls(walls:number){
    const wallsStone = []
    for (let i = 0; i < walls; i++) {
      wallsStone.push('Stone wall')
    }
    this.house.setWalls(wallsStone)
  }

  setCeil(){
    this.house.setCeil('Stone roof')
  }

  setWindows(window:string){
    this.house.setWindows(window)
  }
 
  setDoors(door:string){
    this.house.setDoors(door)
  }

  setStairs(){
    this.house.setStairs()
   }

  getProduct(){
    const house = this.house
    this.reset()
    return house
  }
}

class Director {
  constructor(){
  }

  constructOneStoryHouse(builder: Builder){
    builder.setFoundations(4)
    builder.setFloor()
    builder.setWalls(4)
    builder.setDoors('Principal Door')
    builder.setWindows('Front Window')
    builder.setWindows('Rear window')
    builder.setCeil()
  }

  constructTwoStoryHouse(builder: Builder){
    builder.setFoundations(6)
    builder.setFloor()
    builder.setWalls(4)
    builder.setDoors('Principal Door')
    builder.setWindows('Front Window')
    builder.setWindows('Rear window')
    builder.setCeil()
    builder.setStairs()
    builder.setWalls(4)
    builder.setDoors('Principal Door')
    builder.setWindows('Front Window')
    builder.setWindows('Rear window')
    builder.setCeil()
  }
}

class Application {
  constructor(){}
  makeLivingPlace() {
    const director = new Director()
    const houseBuilder = new HouseBuilder()
    director.constructOneStoryHouse(houseBuilder)
    const house = houseBuilder.getProduct()
    console.log("Application -> makeLivingPlace -> house", house)
    const castleBuilder = new CastleBuilder()
    director.constructOneStoryHouse(castleBuilder)
    const castle = castleBuilder.getProduct()
    console.log("Application -> makeLivingPlace -> castle", castle)
  }
}

const application = new Application()
application.makeLivingPlace()
