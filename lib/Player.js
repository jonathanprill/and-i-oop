const Potion = require('../lib/Potion');

// constrcutor function
function Player(name = '') {
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    
    //  a new Potion object within the Player() constructor.
    this.inventory = [new Potion('health'), new Potion()];
};

// when using prototype, you are creating the method once on the constructor itself
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    }
}
Player.prototype.getInventory = function() {
    if(this.inventory.length) {
        return this.inventory;
    }
    return false;
};

Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
    if (this.health === 0 ) {
        return false;
    } 
    return true;
};

Player.prototype.reduceHealth = function() {
    this.health -= this.health;
    if (this.health < 0) {
        this.health = 0;
    }
}

module.exports = Player;