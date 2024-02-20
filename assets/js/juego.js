/* 
2c = two the clubs (treboles)
2d = diaminds (diamantes)
2h = hearts (corazones)
2s = spades (picas)
*/

(() => {

    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K']

    /* let puntosJugador = 0,
        puntosComputadora = 0; */
    let puntosJugadores = []

    //referencias de html
    const botonPedir = document.querySelector('#botonPedir'),
        botonDetener = document.querySelector('#botonDetener'),
        botonNuevoJuevo = document.querySelector('#botonNuevo')

    /*    const contenedorCartasJugador = document.querySelector('#jugador-cartas'),
           contenedorCartasMaquina = document.querySelector('#computadora-cartas') */

    const smalls = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');


    //funcion para inicializar el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck()
        puntosJugadores = []

        console.log(numJugadores);
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        }
        console.log(puntosJugadores);
    }

    //funcion para crear una nueva baraja de cartas mezcladas
    const crearDeck = () => {

        deck = []

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let esp of especiales) {
            for (let tipo of tipos) {
                deck.push(esp + tipo)
            }
        }

        return _.shuffle(deck);
    }


    //funcion para sacar una carta de la baraja y eliminarla del mazo

    const pedirCarta = () => {

        if (deck.length === 0) { //medida de seg cuando no hay nmas cartas en la baraja
            throw 'no hay cartas en el deck';
        }

        return deck.pop()
    }


    //funcion para conocer el valor de la carta

    const valorCarta = (carta) => {

        let valor = carta.substring(0, carta.length - 1) //substring= metodo para cortar los string

        /*  if (isNaN(valor)) { //pregunta si no es un numero
             console.log('no es un numero');
             valor = valor === 'A' ? 11 : 10;
         } else {
             console.log('es un numero');
             valor = valor * 1
         } */

        return isNaN(valor) ?
            valor = valor === 'A' ? 11 : 10
            : valor = valor * 1
    }


    //funcion que acumula los puntos de cada jugador

    const acumularPuntos = (posicionJugador, carta) => {

        puntosJugadores[posicionJugador] = puntosJugadores[posicionJugador] + valorCarta(carta)
        smalls[posicionJugador].innerText = puntosJugadores[posicionJugador]
        return puntosJugadores[posicionJugador]
    }


    //funcion para mostrar las cartas que van saliendo

    const crearCarta = (carta, posicion) => {

        const imgCarta = document.createElement('img') //creamos una etiqueta img
        imgCarta.src = `assets/cartas/${carta}.png` //le añadimos el src con la carta que obtuvimos
        imgCarta.classList.add('carta') //le agregamos las clases de css necesarias
        divCartasJugadores[posicion].append(imgCarta) //insertamos la carta creada en el div correspondiente

    }


    //logica para turno de la computadora

    const turnoComputadora = (puntosAVencer) => {

        let puntosComputadora = 0;
        let puntosJugador = puntosJugadores[0];

        do {

            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta)

            crearCarta(carta, puntosJugadores.length - 1)

        } while (puntosComputadora < puntosAVencer && puntosAVencer <= 21);


        setTimeout(() => {
            if (puntosJugador <= 21 && puntosJugador > puntosComputadora) {
                alert('gano el jugador')
            } else if (puntosJugador === 21 && puntosComputadora !== 21) {
                alert('gano el jugador')
            } else if (puntosComputadora > 21) {
                alert('gana el jugador')
            } else {
                alert('gana la computadora')
            }
        }, 50);



    }

    //EVENTOS
    //escuchar un evento
    botonPedir.addEventListener('click', () => {


        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(0, carta)

        crearCarta(carta, 0)


        //si el jugador se pasa de 21 detener su juego

        /* puntosJugador > 21 ?
            botonPedir.disabled = true
            : puntosJugador === 21 ? botonPedir.disabled = true : '';; */

        if (puntosJugador > 21) {
            botonPedir.disabled = true;
            botonDetener.disabled = true;
            console.warn('perdiste guachin te pasaste');
            turnoComputadora(puntosJugador)

        } else if (puntosJugador === 21) {
            botonPedir.disabled = true;
            botonDetener.disabled = true;
            console.warn('CONSEGUISTE 21 GUACHOOO');
            turnoComputadora(puntosJugador)
        }


    })

    botonDetener.addEventListener('click', () => {
        botonPedir.disabled = true
        botonDetener.disabled = true
        turnoComputadora(puntosJugador)
    })

    botonNuevoJuevo.addEventListener('click', () => {
        // location.reload()

        console.clear()

        inicializarJuego();

        // deck = [] //limpiamos a la fuerza la baraja
        // deck = crearDeck()

        smalls[0].innerText = 0;
        smalls[1].innerText = 0;

        divCartasJugadores[0].innerText = ''
        divCartasJugadores[1].innerText = ''
        botonPedir.disabled = false
        botonDetener.disabled = false

    })


})()




