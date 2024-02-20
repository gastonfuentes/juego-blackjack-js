/* 
2c = two the clubs (treboles)
2d = diaminds (diamantes)
2h = hearts (corazones)
2s = spades (picas)
*/

(() => {

    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K']

    let puntosJugador = 0;
    let puntosComputadora = 0;

    //referencias de html
    const botonPedir = document.querySelector('#botonPedir')
    const botonDetener = document.querySelector('#botonDetener')
    const botonNuevoJuevo = document.querySelector('#botonNuevo')
    const smalls = document.querySelectorAll('small')
    const contenedorCartasJugador = document.querySelector('#jugador-cartas')
    const contenedorCartasMaquina = document.querySelector('#computadora-cartas')

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

        const carta = deck.pop()

        /*  console.log(deck, carta); */

        return carta
    }

    //pedirCarta()

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

        isNaN(valor) ?
            valor = valor === 'A' ? 11 : 10
            : valor = valor * 1

        /* console.log(valor); */
        return valor;

    }


    //logica para turno de la computadora
    const turnoComputadora = (puntosAVencer) => {

        do {

            const carta = pedirCarta()
            console.log(carta);

            puntosComputadora = puntosComputadora + valorCarta(carta)
            smalls[1].innerText = puntosComputadora
            console.log(puntosComputadora);

            const imgCarta = document.createElement('img') //creamos una etiqueta img
            imgCarta.src = `assets/cartas/${carta}.png` //le añadimos el src con la carta que obtuvimos
            imgCarta.classList.add('carta') //le agregamos las clases de css necesarias

            contenedorCartasMaquina.append(imgCarta)


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
        console.log(carta);

        puntosJugador = puntosJugador + valorCarta(carta)
        smalls[0].innerText = puntosJugador
        console.log(puntosJugador);


        const imgCarta = document.createElement('img') //creamos una etiqueta img
        imgCarta.src = `assets/cartas/${carta}.png` //le añadimos el src con la carta que obtuvimos
        imgCarta.classList.add('carta') //le agregamos las clases de css necesarias

        contenedorCartasJugador.append(imgCarta) //insertamos la carta creada en el div contenedor


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

        deck = [] //limpiamos a la fuerza la baraja
        deck = crearDeck()
        smalls[0].innerText = 0;
        smalls[1].innerText = 0;
        puntosJugador = 0;
        puntosComputadora = 0;
        contenedorCartasJugador.innerText = '';
        contenedorCartasMaquina.innerText = '';
        botonPedir.disabled = false
        botonDetener.disabled = false

    })


})()




