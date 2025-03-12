document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos
    const floatingIconsContainer = document.querySelector(".floating-icons-container");
    const botonMenu = document.getElementById("botonMenu");
    const modal = document.getElementById("menuModal");
    const cerrarModal = document.getElementById("closeMenu");
    const botonCopiar = document.getElementById("botonCopiar");
    const menuTexto = document.getElementById("menuTexto");

    // Lista de íconos flotantes
    const iconFiles = [
        "bandejaParaHorno.png",
        "bolsaDeHarina.png",
        "botellaDeAceite.png",
        "cajaRalladora.png",
        "cartonDeLeche.png",
        "cucharaDeMadera.png",
        "cucharon.png",
        "cuchilloDeChef.png",
        "rodillo.png",
        "salero.png",
        "tablaDeCortar.png",
        "tetera.png"
    ];

    // Función para crear los íconos flotantes
    function createFloatingIcons() {
        for (let i = 0; i < iconFiles.length; i++) {
            let icon = document.createElement("img");
            icon.src = `assets/images/iconos/${iconFiles[i]}`;
            icon.classList.add("floating-icon");

            // Posiciona los íconos de forma aleatoria
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.top = `${Math.random() * 100}vh`;

            floatingIconsContainer.appendChild(icon);
        }
    }
    createFloatingIcons();

    // Función para manejar el bucle de imágenes en la bienvenida
    const images = [
        "assets/images/bienvenida/fotosBucle/imagen1.png",
        "assets/images/bienvenida/fotosBucle/imagen2.png",
        "assets/images/bienvenida/fotosBucle/imagen3.png",
        "assets/images/bienvenida/fotosBucle/imagen4.png"
    ];

    let currentIndex = 0;
    const imageElement = document.getElementById("bucle-img");

    setInterval(() => {
        imageElement.style.opacity = 0; // Desvanecer imagen actual

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex]; // Cambia la imagen existente
            imageElement.style.opacity = 1; // Mostrar la nueva imagen
        }, 1000);
    }, 3000);

    // Funciones para abrir y cerrar el menú modal
    function abrirMenu() {
        modal.classList.add("show");
    }

    function cerrarMenu() {
        modal.classList.remove("show");
    }

    // Eventos de clic para abrir y cerrar el modal
    botonMenu?.addEventListener("click", abrirMenu);
    cerrarModal?.addEventListener("click", cerrarMenu);

    // Cerrar modal si se hace clic fuera de la pestaña
    modal?.addEventListener("click", function (event) {
        if (event.target === modal) {
            cerrarMenu();
        }
    });

    // Funcionalidad para copiar el contenido del menú
    botonCopiar?.addEventListener("click", function () {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(menuTexto.innerText)
                .then(() => {
                    alert("Menú copiado al portapapeles.");
                })
                .catch(err => {
                    console.error("Error al copiar: ", err);
                });
        } else {
            // Método alternativo para navegadores antiguos
            const rango = document.createRange();
            rango.selectNode(menuTexto);
            const seleccion = window.getSelection();
            seleccion.removeAllRanges();
            seleccion.addRange(rango);

            try {
                document.execCommand("copy");
                alert("Menú copiado al portapapeles.");
            } catch (err) {
                console.error("Error al copiar: ", err);
            }

            seleccion.removeAllRanges();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuTexto = document.getElementById("menuTexto");

    function guardarMenu() {
        const user = auth.currentUser;
        if (user) {
            const menuRef = ref(database, `menus/${user.uid}`);
            set(menuRef, menuTexto.innerText)
                .then(() => console.log("Menú guardado en Firebase"))
                .catch(error => console.error("Error al guardar el menú:", error));
        } else {
            console.error("No hay usuario autenticado.");
        }
    }

    function cargarMenu() {
        const user = auth.currentUser;
        if (user) {
            const menuRef = ref(database, `menus/${user.uid}`);
            get(menuRef).then(snapshot => {
                if (snapshot.exists()) {
                    menuTexto.innerText = snapshot.val();
                }
            }).catch(error => console.error("Error al cargar el menú:", error));
        } else {
            console.error("No hay usuario autenticado.");
        }
    }

    menuTexto.addEventListener("input", guardarMenu);

    onAuthStateChanged(auth, user => {
        if (user) {
            cargarMenu();
        }
    });
});


