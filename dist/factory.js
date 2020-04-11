"use strict";
class CreepMele {
    constructor() {
        this.life = 250;
        this.strength = 20;
        this.attack = 30;
    }
    move() {
        console.log('Move CreepMele');
    }
    strike() {
        console.log('Atack CreepMele');
    }
}
class CreepRange {
    constructor() {
        this.life = 200;
        this.strength = 18;
        this.attack = 50;
    }
    move() {
        console.log('Move CreepRange');
    }
    strike() {
        console.log('Atack CreepRange');
    }
}
class CreepAncestral {
    constructor() {
        this.life = 500;
        this.strength = 30;
        this.attack = 100;
    }
    move() {
        console.log('Move CreepAncestral');
    }
    strike() {
        console.log('Atack CreepAncestral');
    }
}
class FirstLevelEnemyFactory {
    createEnemy() {
        const randomEnemy = Math.random();
        if (randomEnemy <= 0.4) {
            return new CreepMele();
        }
        else {
            if (randomEnemy <= 0.8) {
                return new CreepRange();
            }
            else {
                return new CreepAncestral();
            }
        }
    }
}
class SecondLevelEnemyFactory {
    createEnemy() {
        const randomEnemy = Math.random();
        if (randomEnemy <= 0.3) {
            return new CreepMele();
        }
        else {
            if (randomEnemy <= 0.3) {
                return new CreepRange();
            }
            else {
                return new CreepAncestral();
            }
        }
    }
}
class ThirdLevelEnemyFactory {
    createEnemy() {
        const randomEnemy = Math.random();
        if (randomEnemy <= 0.2) {
            return new CreepMele();
        }
        else {
            if (randomEnemy <= 0.2) {
                return new CreepRange();
            }
            else {
                return new CreepAncestral();
            }
        }
    }
}
class GameBatleCrepps {
    constructor(enemyFactory) {
        this.enemyFactory = enemyFactory;
    }
    gameLogic() {
        // ...
        //more logic 
        for (let i = 0; i < 10; i++) {
            let enemy = this.enemyFactory.createEnemy();
            enemy.move();
            enemy.strike();
        }
    }
}
// Game 
console.log('Start Game');
console.log('First Level');
let game = new GameBatleCrepps(new FirstLevelEnemyFactory());
game.gameLogic();
console.log('Second Level');
game = new GameBatleCrepps(new SecondLevelEnemyFactory());
game.gameLogic();
console.log('Third Level');
game = new GameBatleCrepps(new ThirdLevelEnemyFactory());
game.gameLogic();
console.log('End Game');
