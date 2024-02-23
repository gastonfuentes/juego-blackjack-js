const miModulo = (() => {

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
        botonNuevoJuevo = document.querySelector('#botonNuevoJuego')

    const puntajeComputadora = document.querySelector('#puntajeComputadora'),
        puntajeJugador = document.querySelector('#puntajeJugador');

    const sectorJuegoComputadora = document.querySelector('#sectorJuegoComputadora'),
        sectorJuegoJugador = document.querySelector('#sectorJuegoJugador');

    const winComputadora = document.querySelector('#winComputadora'),
        winJugador = document.querySelector('#winJugador')


    //funcion para inicializar el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck()
        puntosJugadores = []

        console.log(numJugadores);
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        }

        /* smalls.forEach(elem => elem.innerText = 0) */
        puntajeComputadora.innerText = 0;
        puntajeJugador.innerText = 0;
        /* divCartasJugadores.forEach(elem => elem.innerText = '') */
        sectorJuegoComputadora.innerText = '';
        sectorJuegoJugador.innerText = '';

        winComputadora.classList.add('ocultar');
        winJugador.classList.add('ocultar')

        //parte nueva de la logica al comenzar con cartas en mano

        //cartas para el jugador
        for (let i = 0; i < 2; i++) {
            let carta = pedirCarta()
            valorCarta(carta)
            crearCarta(carta, 0)
            acumularPuntos(0, carta)
        }

        setTimeout(() => {
            const carta = pedirCarta()
            valorCarta(carta)
            crearCarta(carta, 1)
            acumularPuntos(1, carta)
        }, 500)


        botonPedir.disabled = false
        botonDetener.disabled = false

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

        puntosJugadores[posicionJugador] = puntosJugadores[posicionJugador] + valorCarta(carta);
        console.log(puntosJugadores);
        posicionJugador === 0 ? puntajeJugador.innerText = puntosJugadores[0] : puntajeComputadora.innerText = puntosJugadores[1]
        return puntosJugadores[posicionJugador]
    }


    //funcion para mostrar las cartas que van saliendo

    const crearCarta = (carta, posicion) => {

        const imgCarta = document.createElement('img') //creamos una etiqueta img
        imgCarta.src = `assets/cartas/${carta}.png` //le añadimos el src con la carta que obtuvimos
        imgCarta.classList.add('carta') //le agregamos las clases de css necesarias
        posicion === 0 ? sectorJuegoJugador.append(imgCarta) : sectorJuegoComputadora.append(imgCarta) //insertamos la carta creada en el div correspondiente

    }

    //funcion que determina quien gano y manda un mensaje

    const determinarGanador = () => {

        const [puntosJugador, puntosComputadora] = puntosJugadores

        setTimeout(() => {
            if (puntosJugador <= 21 && puntosJugador > puntosComputadora) {
                /* alert('gano el jugador') */
                winJugador.classList.replace('ocultar', 'mostrar')
            } else if (puntosJugador === 21 && puntosComputadora !== 21) {
                /* alert('gano el jugador') */
                winJugador.classList.replace('ocultar', 'mostrar')
            } else if (puntosComputadora > 21) {
                /* alert('gana el jugador') */
                winJugador.classList.replace('ocultar', 'mostrar')
            } else {
                winComputadora.classList.replace('ocultar', 'mostrar')
                /* alert('gana la computadora') */
            }
        }, 50);

    }

    //funcion delay
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    //logica para turno de la computadora

    const turnoComputadora = async () => {

        let puntosComputadora = 0;
        let puntosAVencer = puntosJugadores[0];

        while (puntosComputadora < puntosAVencer && puntosAVencer <= 21) {
            const carta = pedirCarta()
            console.log('dentro del while');
            await delay(500)
            console.log('despues del while');
            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta)
            crearCarta(carta, puntosJugadores.length - 1)
        }

        determinarGanador()

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
        turnoComputadora()
    })

    botonNuevoJuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    }

})()




