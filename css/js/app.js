document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MENÚ HAMBURGUESA MÓVIL
    // ==========================================
    const navContainer = document.querySelector("header .nav-container");
    if (navContainer) {
        const botonMenu = document.createElement("button");
        botonMenu.classList.add("menu-hamburguesa");
        botonMenu.innerHTML = "☰ Menú";
        botonMenu.setAttribute("aria-expanded", "false");
        navContainer.insertBefore(botonMenu, document.querySelector("nav ul"));

        const ulMenu = document.querySelector("nav ul");
        botonMenu.addEventListener("click", () => {
            const abierto = ulMenu.classList.toggle("activo");
            botonMenu.setAttribute("aria-expanded", abierto);
        });
    }
    // ==========================================
    // 2. MODO OSCURO CON LOCALSTORAGE
    // ==========================================
    const headerNav = document.querySelector("header .nav-container");
    if (headerNav) {
        const btnTema = document.createElement("button");
        btnTema.classList.add("btn-tema");
        btnTema.textContent = "🌓 Tema";
        headerNav.appendChild(btnTema);

        const modoGuardado = localStorage.getItem("isw311-modo-oscuro");
        if (modoGuardado === "activo") {
            document.body.classList.add("oscuro");
        }

        btnTema.addEventListener("click", () => {
            document.body.classList.toggle("oscuro");
            const esOscuro = document.body.classList.contains("oscuro");
            localStorage.setItem("isw311-modo-oscuro", esOscuro ? "activo" : "inactivo");
        });
    }
    // ==========================================
    // 3. AÑO AUTOMÁTICO EN EL FOOTER
    // ==========================================
    const footers = document.querySelectorAll("footer");
    footers.forEach(f => {
        const pAno = document.createElement("p");
        pAno.textContent = `© ${new Date().getFullYear()} Salud Integral Plus. Todos los derechos reservados.`;
        f.appendChild(pAno);
    });