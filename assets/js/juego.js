/* 
2c = two the clubs (treboles)
2d = diaminds (diamantes)
2h = hearts (corazones)
2s = spades (picas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

//funcion para crear una nueva baraja de cartas mezcladas
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


    deck = _.shuffle(deck);

    console.log(deck);

    return deck;

}

crearDeck()


//funcion para sacar una carta de la baraja y eliminarla del mazo

const pedirCarta = () => {

    if (deck.length === 0) { //medida de seg cuando no hay nmas cartas en la baraja
        throw 'no hay cartas en el deck';
    }

    let carta = deck.pop()

    console.log(deck, carta);

    return carta
}



for (i = 0; i < 100; i++) {
    pedirCarta()
}

