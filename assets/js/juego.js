/* 
2c = two the clubs (treboles)
2d = diaminds (diamantes)
2h = hearts (corazones)
2s = spades (picas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    /* for (let j = 0; j < especiales.length; j++) {
        for (let tipo of tipos) {
            deck.push(especiales[j] + tipo)
        }
    } */

    for (let esp of especiales) {
        for (let tipo of tipos) {
            deck.push(esp + tipo)
        }
    }
}

crearDeck()

console.log(deck);

deck = _.shuffle(deck);

console.log(deck);