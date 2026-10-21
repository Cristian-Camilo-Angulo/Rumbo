"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const destinos = [
        {
            id: "cerro-india",
            titulo: "Cerro de la India",
            categoria: "MEMORIA ANCESTRAL · TRADICIÓN ORAL",
            descripcion: "La tradición oral del Valle del Patía cuenta que este cerro tiene la silueta de una mujer acostada, cuyo perfil permite distinguir la nariz y la boca mientras mira hacia el sol. Este relato se relaciona con la memoria de los antiguos pobladores patías y con la historia que da nombre al lugar. El cerro invita a contemplar el paisaje y acercarse a las narraciones transmitidas por la comunidad.",
            nota: "Relato basado en la tradición oral compartida para el proyecto Rumbo.",
            imagenes: ["Cerro_De_La_India"],
            alt: "Paisaje del Cerro de la India"
        },
        {
            id: "balneario-angulo",
            titulo: "Río Patía — Balneario de Angulo",
            categoria: "PAISAJE FLUVIAL",
            descripcion: "El Río Patía forma parte del paisaje que identifica a este territorio. Las fotografías del Balneario de Angulo permiten observar el entorno desde distintas perspectivas y acercarse visualmente a uno de los lugares señalados en la propuesta turística de Rumbo.",
            nota: "La descripción se podrá ampliar cuando se incorpore la documentación específica de este balneario.",
            imagenes: [
                "angulo"
            ],
            alt: "Paisaje del Río Patía en el Balneario de Angulo"
        },
        {
            id: "cerro-manzanillo",
            titulo: "Cerro de Manzanillo",
            categoria: "RAÍCES AFRO · TRADICIÓN ORAL",
            descripcion: "Según la tradición oral compartida por habitantes patianos, el Cerro de Manzanillo guarda un relato relacionado con los primeros pobladores afrodescendientes de la región. Se cuenta que, al subir al cerro, algunos evocaban a África y recordaban sus raíces. Esta narración conecta el paisaje con la memoria cultural y con las historias que continúan transmitiéndose entre generaciones.",
            nota: "La conexión con África se presenta como un relato de tradición oral, no como un hecho histórico verificado de manera independiente.",
            imagenes: ["CerroDeManzanillo"],
            alt: "Paisaje del Cerro de Manzanillo"
        },
        {
            id: "balneario-india",
            titulo: "Balneario La India — Río Patía",
            categoria: "NATURALEZA · PAISAJE",
            descripcion: "El relato del proyecto destaca el reflejo del cielo sobre el río, el contraste entre las montañas verdes y el azul del paisaje, y la transparencia del agua. Las imágenes permiten contemplar este entorno natural y reconocer su potencial para experiencias de turismo de naturaleza y ecoturismo.",
            nota: "Antes de planear una visita, conviene confirmar las condiciones de acceso y las recomendaciones locales.",
            imagenes: ["Balneario La India Rio Patia"],
            alt: "Balneario La India, Río Patía"
        },
        {
            id: "hacienda-pachuca",
            titulo: "Hacienda La Pachuca",
            categoria: "PATRIMONIO NATURAL",
            descripcion: "La Hacienda La Pachuca aparece en el relato como un lugar donde se encuentra una higuera de la India de gran tamaño. Sus ramas extensas y sus enormes raíces llaman la atención de quienes la contemplan. Según el relato proporcionado para Rumbo, la semilla de este árbol fue traída desde Brasil. Su presencia convierte al árbol en un protagonista del paisaje.",
            nota: "El origen de la semilla se atribuye al relato oral suministrado para el proyecto.",
            imagenes: ["Hacienda la Pachuca"],
            alt: "Árbol de gran tamaño en la Hacienda La Pachuca"
        },
        {
            id: "rio-galindez",
            titulo: "Río de Galíndez",
            categoria: "RÍOS · COMUNIDAD · ECOTURISMO",
            descripcion: "En el corregimiento de El Estrecho, sobre la carretera Panamericana, en Galíndez, se encuentra la confluencia de los ríos San Jorge y Huachicono, un lugar emblemático para la comunidad local. Este espacio se convierte en el centro de actividades como bañarse, lavar ropa y nadar, especialmente durante los meses cálidos de julio a septiembre, cuando las temperaturas alcanzan los 30 °C.\n\nLa playa bajo el puente es la zona más concurrida, ya que su sombra y ambiente acogedor invitan a la recreación. El área también es ideal para promover actividades de ecoturismo.",
            nota: "Las corrientes del río y la altura del puente pueden representar riesgos. Se recomienda evitar saltos desde el puente y no utilizar neumáticos como balsas.",
            imagenes: ["puente Galindez"],
            alt: "Puente de Galíndez y su entorno fluvial"
        }
    ];

    const extensiones = ["jpeg", "jpg", "png", "webp"];

    function variantesDeNombre(nombre) {
        const base = nombre.replace(/\.(jpe?g|png|webp)$/i, "");

        return [...new Set([
            base,
            base.replaceAll("_", " "),
            base.replaceAll(" ", "_"),
            base.replaceAll("-", "_"),
            base.replaceAll("_", "-"),
            base.replaceAll(" ", "-")
        ])];
    }

    function cargarImagen(img, nombre, alternativa = null) {
        if (!img || !nombre) return;

        const rutas = [];

        variantesDeNombre(nombre).forEach(variante => {
            extensiones.forEach(extension => {
                rutas.push(
                    `../img/${encodeURIComponent(variante)}.${extension}`
                );
            });
        });

        if (alternativa) {
            rutas.push(alternativa);
        }

        let indice = 0;

        img.onerror = () => {
            indice++;

            if (indice < rutas.length) {
                img.src = rutas[indice];
            } else {
                img.onerror = null;
                img.classList.add("imagen-no-disponible");
                console.error(
                    "No se pudo cargar la imagen:",
                    nombre,
                    rutas
                );
            }
        };

        img.src = rutas[indice];
    }

    // Cargar las imágenes de las tarjetas.
    document.querySelectorAll("[data-imagen-base]").forEach(img => {
        cargarImagen(img, img.dataset.imagenBase);
    });

    // Imagen de portada.
    const portada = document.querySelector(".lugares-portada-foto img");

    if (portada) {
        cargarImagen(portada, "18", "../img/19.jpeg");
    }

    // Menú Descubrir.
    const contenedorMenu = document.getElementById("lugaresDescubrir");
    const botonMenu = document.getElementById("botonDescubrirLugares");
    const menu = document.getElementById("menuDescubrirLugares");

    if (contenedorMenu && botonMenu && menu) {
        const cerrarMenu = () => {
            menu.hidden = true;
            botonMenu.setAttribute("aria-expanded", "false");
        };

        botonMenu.addEventListener("click", evento => {
            evento.stopPropagation();

            const abierto =
                botonMenu.getAttribute("aria-expanded") === "true";

            menu.hidden = abierto;
            botonMenu.setAttribute("aria-expanded", String(!abierto));
        });

        menu.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", cerrarMenu);
        });

        document.addEventListener("click", evento => {
            if (!contenedorMenu.contains(evento.target)) {
                cerrarMenu();
            }
        });

        document.addEventListener("keydown", evento => {
            if (evento.key === "Escape") {
                cerrarMenu();
            }
        });
    }

    // Animaciones de entrada.
    const elementosAnimados = document.querySelectorAll(
        ".destino, .lugares-introduccion, .lugares-frase, .lugares-cierre"
    );

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        elementosAnimados.forEach(elemento => {
            elemento.classList.add("lugares-revelar");
            observador.observe(elemento);
        });
    } else {
        elementosAnimados.forEach(elemento => {
            elemento.classList.add("visible");
        });
    }

    // Elementos de la ventana de historias.
    const modal = document.getElementById("historiaModal");
    const botonCerrar = document.getElementById("historiaCerrar");
    const titulo = document.getElementById("historiaTitulo");
    const categoria = document.getElementById("historiaCategoria");
    const descripcion = document.getElementById("historiaDescripcion");
    const nota = document.getElementById("historiaNota");
    const imagen = document.getElementById("historiaImagen");
    const contador = document.getElementById("historiaContador");
    const anterior = document.getElementById("historiaAnterior");
    const siguiente = document.getElementById("historiaSiguiente");

    if (
        !modal || !botonCerrar || !titulo || !categoria ||
        !descripcion || !nota || !imagen || !contador ||
        !anterior || !siguiente
    ) {
        return;
    }

    let indiceDestino = 0;
    let indiceFoto = 0;
    let elementoAnterior = null;

    function actualizarFicha() {
        const destino = destinos[indiceDestino];

        titulo.textContent = destino.titulo;
        categoria.textContent = destino.categoria;
        descripcion.textContent = destino.descripcion;
        nota.textContent = destino.nota;

        imagen.alt = destino.alt;
        imagen.classList.remove("imagen-no-disponible");

        const nombreFoto = destino.imagenes[indiceFoto];
        cargarImagen(imagen, nombreFoto);

        anterior.hidden = false;
        siguiente.hidden = false;

        contador.textContent =
            `${String(indiceDestino + 1).padStart(2, "0")} / ` +
            `${String(destinos.length).padStart(2, "0")}`;

        contador.title =
            `Destino ${indiceDestino + 1} de ${destinos.length}. ` +
            `Fotografía ${indiceFoto + 1} de ${destino.imagenes.length}.`;
    }

    function abrirDestino(indice, elemento) {
        indiceDestino = (indice + destinos.length) % destinos.length;
        indiceFoto = 0;
        elementoAnterior = elemento || null;

        actualizarFicha();

        if (!modal.open) {
            modal.showModal();
        }

        document.body.classList.add("historia-abierta");
        botonCerrar.focus();
    }

    function cambiarDestino(direccion) {
        indiceDestino =
            (indiceDestino + direccion + destinos.length) % destinos.length;

        indiceFoto = 0;
        actualizarFicha();
    }

    function cambiarFoto(direccion) {
        const fotos = destinos[indiceDestino].imagenes;

        if (fotos.length > 1) {
            indiceFoto = (indiceFoto + direccion + fotos.length) % fotos.length;
            actualizarFicha();
        } else {
            cambiarDestino(direccion);
        }
    }

    // Abrir la historia desde las tarjetas.
    document.querySelectorAll("[data-destino]").forEach(elemento => {
        elemento.addEventListener("click", () => {
            const indice = destinos.findIndex(
                destino => destino.id === elemento.dataset.destino
            );

            if (indice !== -1) {
                abrirDestino(indice, elemento);
            }
        });
    });

    botonCerrar.addEventListener("click", () => {
        modal.close();
    });

    anterior.addEventListener("click", () => {
        cambiarFoto(-1);
    });

    siguiente.addEventListener("click", () => {
        cambiarFoto(1);
    });

    // Cerrar al pulsar el fondo exterior.
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            modal.close();
        }
    });

    modal.addEventListener("close", () => {
        document.body.classList.remove("historia-abierta");

        if (elementoAnterior) {
            elementoAnterior.focus();
        }
    });

    // Navegación con el teclado.
    modal.addEventListener("keydown", evento => {
        if (evento.key === "ArrowLeft") {
            evento.preventDefault();
            cambiarFoto(-1);
        }

        if (evento.key === "ArrowRight") {
            evento.preventDefault();
            cambiarFoto(1);
        }
    });
});