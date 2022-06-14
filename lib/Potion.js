// Constructor functions act like blueprints for objects
// and are meant to be used in conjunction with the new keyword
// do not use arrow functions as constructor functions.
// Arrow functions change the meaning of the keyword this

function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.raondom() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

console.log('asdasd')

module.exports = Potion;  