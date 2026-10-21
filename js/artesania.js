
(() => {
    "use strict";

    const fotos = [
        { src: "../img/chica1.PNG", titulo: "Accesorios de formas y color" },
        { src: "../img/Chica2.PNG", titulo: "Diseño y detalle" },
        { src: "../img/Chica3.PNG", titulo: "Accesorios con identidad visual" },
        { src: "../img/chica4.PNG", titulo: "Geometría y expresión" },
        { src: "../img/lampara3.jpeg", titulo: "Luz entre perforaciones" },
        { src: "../img/lampara4.jpeg", titulo: "Formas iluminadas" },
        { src: "../img/lampara5.jpeg", titulo: "Un juego de luces y sombras" },
        { src: "../img/lamparas.PNG", titulo: "Una colección de lámparas" },
        { src: "../img/lampara2.PNG", titulo: "Lámpara artesanal" }
    ];

    const obtener = id => document.getElementById(id);

    const principal = obtener("foto-principal");
    const contador = obtener("contador-fotos");
    const numeroFoto = obtener("numero-foto");
    const botonPausa = obtener("pausar");
    const puntos = obtener("miniaturas");
    const visor = obtener("visor");

    if (!principal || !contador || !numeroFoto || !botonPausa || !puntos || !visor) {
        console.error("No se encontraron todos los elementos de la galería de Artesanía.");
        return;
    }

    let indice = 0;
    let intervalo = null;
    let pausado = false;
    let focoAnterior = null;
    let temporizadorCambio = null;

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function actualizarPuntos() {
        puntos.querySelectorAll(".galeria-punto").forEach((boton, i) => {
            const activa = i === indice;

            boton.classList.toggle("activa", activa);
            boton.setAttribute("aria-pressed", String(activa));
        });
    }

    function mostrar(nuevoIndice) {
        indice = (nuevoIndice + fotos.length) % fotos.length;

        const actual = fotos[indice];

        principal.classList.add("cambiando-foto");

        clearTimeout(temporizadorCambio);

        temporizadorCambio = setTimeout(() => {
            principal.src = actual.src;
            principal.alt = actual.titulo;

            numeroFoto.textContent =
                `${String(indice + 1).padStart(2, "0")} / ${String(fotos.length).padStart(2, "0")}`;

            contador.textContent =
                `${String(indice + 1).padStart(2, "0")} — ${String(fotos.length).padStart(2, "0")}`;

            actualizarPuntos();
            principal.classList.remove("cambiando-foto");
        }, 150);
    }

    fotos.forEach((foto, i) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "galeria-punto";
        boton.setAttribute("aria-label", `Ver fotografía ${i + 1}: ${foto.titulo}`);
        boton.setAttribute("aria-pressed", String(i === 0));

        boton.addEventListener("click", () => {
            mostrar(i);
            iniciar();
        });

        puntos.appendChild(boton);
    });

    function iniciar() {
        clearInterval(intervalo);

        if (
            !pausado &&
            !reducirMovimiento &&
            !document.hidden &&
            visor.hidden
        ) {
            intervalo = setInterval(() => {
                mostrar(indice + 1);
            }, 3500);
        }
    }

    obtener("anterior").addEventListener("click", () => {
        mostrar(indice - 1);
        iniciar();
    });

    obtener("siguiente").addEventListener("click", () => {
        mostrar(indice + 1);
        iniciar();
    });

    botonPausa.addEventListener("click", () => {
        pausado = !pausado;

        botonPausa.textContent = pausado
            ? "▶ Reanudar"
            : "Ⅱ Pausar";

        botonPausa.setAttribute("aria-pressed", String(pausado));

        iniciar();
    });

    function abrirVisor() {
        focoAnterior = document.activeElement;

        obtener("imagen-ampliada").src = fotos[indice].src;
        obtener("imagen-ampliada").alt = fotos[indice].titulo;
        obtener("visor-titulo").textContent = fotos[indice].titulo;
        obtener("visor-descripcion").textContent = "";

        visor.hidden = false;
        visor.classList.add("abierto");

        obtener("cerrar-visor").focus();

        clearInterval(intervalo);
    }

    function cerrarVisor() {
        visor.classList.remove("abierto");
        visor.hidden = true;

        if (focoAnterior) {
            focoAnterior.focus();
        }

        iniciar();
    }

    obtener("abrir-foto").addEventListener("click", abrirVisor);
    obtener("cerrar-visor").addEventListener("click", cerrarVisor);

    visor.addEventListener("click", evento => {
        if (evento.target === visor) {
            cerrarVisor();
        }
    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !visor.hidden) {
            cerrarVisor();
            return;
        }

        if (!visor.hidden) {
            return;
        }

        if (evento.key === "ArrowRight") {
            mostrar(indice + 1);
            iniciar();
        }

        if (evento.key === "ArrowLeft") {
            mostrar(indice - 1);
            iniciar();
        }
    });

    document.addEventListener("visibilitychange", iniciar);

    mostrar(0);
    iniciar();
})();
