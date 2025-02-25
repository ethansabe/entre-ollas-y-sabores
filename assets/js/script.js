document.addEventListener("DOMContentLoaded", () => {
    const floatingIconsContainer = document.querySelector(".floating-icons-container");

    // Lista de iconos
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

    // Función para crear los iconos flotantes
    function createFloatingIcons() {
        for (let i = 0; i < iconFiles.length; i++) {
            let icon = document.createElement("img");
            icon.src = `assets/images/iconos/${iconFiles[i]}`;
            icon.classList.add("floating-icon");

            // Posiciona de forma aleatoria
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.top = `${Math.random() * 100}vh`;

            floatingIconsContainer.appendChild(icon);
        }
    }

    createFloatingIcons();
});

document.addEventListener("DOMContentLoaded", () => {
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
});

