const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'Enter your name...'
        })
        //destructure the name
        .then(({ name }) => {
            this.player = new Player(name);
            // console.log(this.currentEnemy, this.player);
            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log("YOUR STATS: ");
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
    this.battle();
};

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        //player prompts go here
        inquirer
            .prompt({
                type: 'list',
                message: "what would you like to do?",
                name: "action",
                choices: ['attack', 'use potion']
            })
            .then(({ action }) => {
                if (action === 'use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You Dont Have any POtions");
                        return;
                    }
                    console.log(this.player.getInventory())
                    inquirer
                    .prompt({
                        type: 'list',
                        message: 'which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((itemm, indexx) => `${indexx+1}: ${itemm.name}`)
                    })
                    .then(({ action }) => {
                        const potionDetails = action.split(': ');
                        this.player.usePotion(potionDetails[0]-1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                    });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);
                    console.log(`you attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`you were attacked by ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

module.exports = Game;
