"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const relatos = [
        {
            foto: "img/4.jpeg",
            alt: "Mujer patiana con un totumo, símbolo de identidad cultural",
            numero: "01 / IDENTIDAD",
            etiqueta: "RAÍCES QUE NOS DEFINEN",
            titulo: "La identidad vive en su gente.",
            texto:
                "En cada rostro, gesto y celebración permanece la memoria de Patía. " +
                "Las tradiciones no son solo parte del pasado: siguen presentes " +
                "en la forma de reunirse, compartir y reconocerse como comunidad.",
            boton: "Siguiente historia"
        },
        {
            foto: "img/7.jpeg",
            alt: "Artesanía tradicional elaborada con totumo",
            numero: "02 / SABERES",
            etiqueta: "MANOS QUE GUARDAN HISTORIAS",
            titulo: "El conocimiento también se hereda.",
            texto:
                "La Artesana selecciona y trabaja el totumo para " +
                "transformarlo en recipientes e instrumentos. Cada pieza conserva " +
                "técnicas, creatividad y conocimientos transmitidos entre generaciones.",
            boton: "Siguiente historia"
        },
        {
            foto: "img/Danza.jpeg",
            alt: "Jóvenes con vestuario tradicional interpretando música y expresiones culturales patianas",
            numero: "03 / MÚSICA Y DANZA",
            etiqueta: "TRADICIONES QUE SIGUEN VIVAS",
            titulo: "La cultura también se aprende y se comparte.",
            texto:
                "Las mujeres que mantienen vivas las expresiones artísticas del " +
    "Patía son portadoras de una tradición que se transmite a través " +
    "de la música, el bambuco, la danza y la memoria colectiva. " +
    "Su talento y dedicación acercan a niños y jóvenes a las raíces " +
    "culturales de su territorio, haciendo que estos saberes sigan " +
    "pasando de generación en generación.",
            boton: "Siguiente historia"
        },
        {
            foto: "img/Territorio.jpeg",
            alt: "Parejas de bailarines con trajes tradicionales durante una celebración popular en Patía",
            numero: "04 / DANZA FOLCLÓRICA",
            etiqueta: "EL RITMO DE NUESTRA IDENTIDAD",
            titulo: "Cada paso cuenta una historia.",
            texto:
                "En las celebraciones de Patía, la danza reúne a las personas " +
                "alrededor de la música, el movimiento y la tradición. Los trajes, " +
                "los pasos y los encuentros culturales expresan la identidad " +
                "patiana y ayudan a transmitir sus costumbres entre generaciones.",
            boton: "Volver a la identidad"
        }
    ];

    const foto = document.getElementById("relato-foto");
    const numero = document.getElementById("relato-numero");
    const etiqueta = document.getElementById("relato-etiqueta");
    const titulo = document.getElementById("relato-titulo");
    const texto = document.getElementById("relato-texto");
    const progreso = document.getElementById("relato-progreso");
    const siguiente = document.getElementById("relato-siguiente");
    const puntos = document.querySelectorAll(".relato-punto");
    const panel = document.querySelector(".relato-cultural");

    if (!foto || !titulo || !texto || !siguiente) {
        return;
    }

    let actual = 0;

    function mostrarRelato(indice) {

        actual = (indice + relatos.length) % relatos.length;

        const relato = relatos[actual];

        if (panel) {
            panel.classList.add("cambiando");
        }

        const nuevaImagen = new Image();

        nuevaImagen.onload = () => {

            foto.src = relato.foto;
            foto.alt = relato.alt;

            numero.textContent = relato.numero;
            etiqueta.textContent = relato.etiqueta;
            titulo.textContent = relato.titulo;
            texto.textContent = relato.texto;

            if (progreso) {
                progreso.innerHTML =
                    `0${actual + 1} <i>—</i> 0${relatos.length}`;
            }

            const textoBoton = siguiente.querySelector("span");

            if (textoBoton) {
                textoBoton.textContent = "↗";
            }

            puntos.forEach((punto, i) => {

                const activo = i === actual;

                punto.classList.toggle("activo", activo);

                if (activo) {
                    punto.setAttribute("aria-current", "true");
                } else {
                    punto.removeAttribute("aria-current");
                }
            });

            if (panel) {
                panel.classList.remove("cambiando");
            }
        };

        nuevaImagen.onerror = () => {

            if (panel) {
                panel.classList.remove("cambiando");
            }

            console.error(
                "No se pudo cargar la imagen:",
                relato.foto,
                "Comprueba el nombre y la extensión del archivo."
            );
        };

        nuevaImagen.src = relato.foto;
    }

    siguiente.addEventListener("click", () => {
        mostrarRelato(actual + 1);
    });

    puntos.forEach((punto) => {
        punto.addEventListener("click", () => {
            mostrarRelato(Number(punto.dataset.relato));
        });
    });

    // Cerrar el menú al seleccionar una página
    // o al hacer clic fuera de él.

    const menuPaginas = document.querySelector(".menu-paginas");

    if (menuPaginas) {

        document.addEventListener("click", (evento) => {

            if (
                menuPaginas.open &&
                !menuPaginas.contains(evento.target)
            ) {
                menuPaginas.open = false;
            }
        });

        menuPaginas.querySelectorAll("a").forEach((enlace) => {

            enlace.addEventListener("click", () => {
                menuPaginas.open = false;
            });
        });
    }

    mostrarRelato(0);

});
