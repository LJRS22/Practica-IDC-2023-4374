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
    // ==========================================
    // 4. CONTENIDO DINÁMICO DEL CATÁLOGO (servicios.html)
    // ==========================================
    const contenedorCatalogo = document.querySelector("#catalogo-dinamico");
    if (contenedorCatalogo) {
        const serviciosDatos = [
            { id: 1, nombre: "Prueba de Esfuerzo (VO2 máx)", categoria: "fisiologia", precio: 4800, desc: "Evaluación cardiorrespiratoria con gases espirados.", img: "https://placehold.co/400x250/253C66/FFFFFF?text=VO2+Max" },
            { id: 2, nombre: "Biomecánica Ciclismo 3D", categoria: "fisiologia", precio: 5500, desc: "Ajuste milimétrico de posición sobre la bicicleta.", img: "https://placehold.co/400x250/45916E/FFFFFF?text=Biomecanica" },
            { id: 3, nombre: "Sesión de Fisioterapia Avanzada", categoria: "rehabilitacion", precio: 1800, desc: "Terapia miofascial, punción seca y presoterapia.", img: "https://placehold.co/400x250/2F855A/FFFFFF?text=Fisioterapia" },
            { id: 4, nombre: "Evaluación Antropométrica ISAK", categoria: "nutricion", precio: 2500, desc: "Composición corporal y plan de hidratación.", img: "https://placehold.co/400x250/253C66/FFFFFF?text=Nutricion" },
            { id: 5, nombre: "Ecocardiograma Doppler", categoria: "cardiologia", precio: 3200, desc: "Estudio morfológico y funcional cardíaco.", img: "https://placehold.co/400x250/B42335/FFFFFF?text=Cardiologia" },
            { id: 6, nombre: "Paquete Integral Atleta Pro", categoria: "paquetes", precio: 15130, desc: "Incluye los 5 servicios anteriores con 15% de descuento.", img: "https://placehold.co/400x250/45916E/FFFFFF?text=Pack+Pro" }
        ];

        // Crear controles de búsqueda y filtro
        const divControles = document.createElement("div");
        divControles.style.cssText = "display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;";
        divControles.innerHTML = `
            <input type="text" id="buscador" placeholder="Buscar servicio..." style="flex:1; min-width:200px;">
            <select id="filtro-cat" style="padding:10px;">
                <option value="todos">Todas las categorías</option>
                <option value="fisiologia">Fisiología y Biomecánica</option>
                <option value="rehabilitacion">Rehabilitación</option>
                <option value="nutricion">Nutrición</option>
                <option value="cardiologia">Cardiología</option>
                <option value="paquetes">Paquetes</option>
            </select>
            <span id="contador-resultados" style="align-self:center; font-weight:bold;"></span>
        `;
        contenedorCatalogo.before(divControles);

        const pintarTarjetas = (lista) => {
            contenedorCatalogo.innerHTML = "";
            contenedorCatalogo.className = "grid-catalogo";
            
            if (lista.length === 0) {
                contenedorCatalogo.innerHTML = "<p>No se encontraron servicios coincidentes.</p>";
                document.querySelector("#contador-resultados").textContent = "Mostrando 0 servicios";
                return;
            }

            lista.forEach(s => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-servicio");
                const precioFormateado = s.precio.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
                tarjeta.innerHTML = `
                    <div>
                        <img src="${s.img}" alt="${s.nombre}">
                        <h3>${s.nombre}</h3>
                        <p>${s.desc}</p>
                    </div>
                    <div>
                        <p style="font-weight:bold; color:var(--brand-green); margin-top:10px;">${precioFormateado}</p>
                    </div>
                `;
                contenedorCatalogo.appendChild(tarjeta);
            });
            document.querySelector("#contador-resultados").textContent = `Mostrando ${lista.length} de ${serviciosDatos.length} servicios`;
        };

        pintarTarjetas(serviciosDatos);

        // Eventos de filtro y búsqueda
        const buscador = document.querySelector("#buscador");
        const filtroCat = document.querySelector("#filtro-cat");

        const filtrarServicios = () => {
            const texto = buscador.value.toLowerCase();
            const cat = filtroCat.value;

            const filtrados = serviciosDatos.filter(s => {
                const coincideTexto = s.nombre.toLowerCase().includes(texto) || s.desc.toLowerCase().includes(texto);
                const coincideCat = cat === "todos" || s.categoria === cat;
                return coincideTexto && coincideCat;
            });
            pintarTarjetas(filtrados);
        };

        buscador.addEventListener("input", filtrarServicios);
        filtroCat.addEventListener("change", filtrarServicios);
    }
    // ==========================================
    // 5. VALIDACIÓN AVANZADA DE FORMULARIO (contacto.html)
    // ==========================================
    const formulario = document.querySelector("form");
    if (formulario) {
        // Preparar spans de error dinámicamente
        const campos = formulario.querySelectorAll("input, select, textarea");
        campos.forEach(campo => {
            if (campo.type !== "submit" && campo.type !== "radio" && campo.type !== "checkbox") {
                const spanError = document.createElement("span");
                spanError.classList.add("error");
                spanError.id = `error-${campo.id}`;
                campo.setAttribute("aria-describedby", spanError.id);
                campo.after(spanError);

                // Borrar error al escribir
                campo.addEventListener("input", () => {
                    campo.classList.remove("invalido");
                    spanError.textContent = "";
                });
            }
        });

        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            let hayErrores = false;

            // Regla propia 1: Validar Teléfono Dominicano (809, 829, 849 + 7 dígitos)
            const inputTel = document.querySelector("#telefono");
            const spanTel = document.querySelector("#error-telefono");
            const regexTel = /^(809|829|849)[0-9]{7}$/;
            if (inputTel && !regexTel.test(inputTel.value.replace(/-/g, ""))) {
                inputTel.classList.add("invalido");
                spanTel.textContent = "El teléfono debe ser un número válido de RD (809, 829 u 849 seguido de 7 dígitos).";
                hayErrores = true;
            }

            // Regla propia 2: Validar que la fecha no sea en el pasado
            const inputFecha = document.querySelector("#fecha-cita");
            const spanFecha = document.querySelector("#error-fecha-cita");
            if (inputFecha) {
                const fechaSeleccionada = new Date(inputFecha.value);
                const hoy = new Date();
                hoy.setHours(0,0,0,0);
                if (fechaSeleccionada < hoy) {
                    inputFecha.classList.add("invalido");
                    spanFecha.textContent = "La fecha de la cita no puede ser en el pasado.";
                    hayErrores = true;
                }
            }

            // Regla propia 3: Motivo de consulta con al menos 15 caracteres
            const txtSintomas = document.querySelector("#sintomas");
            const spanSintomas = document.querySelector("#error-sintomas");
            if (txtSintomas && txtSintomas.value.trim().length < 15) {
                txtSintomas.classList.add("invalido");
                spanSintomas.textContent = "Por favor detalla el motivo con al menos 15 caracteres.";
                hayErrores = true;
            }

            if (!hayErrores) {
                // Mensaje de éxito sin alert()
                const divExito = document.createElement("div");
                divExito.style.cssText = "background:var(--green-soft); border:2px solid var(--brand-green); padding:16px; border-radius:8px; margin-top:20px;";
                divExito.innerHTML = `
                    <h3 style="color:var(--brand-green);">¡Cita solicitada con éxito!</h3>
                    <p>Hemos registrado tu solicitud correctamente. Te contactaremos al teléfono indicado para confirmar.</p>
                `;
                formulario.reset();
                formulario.after(divExito);
                setTimeout(() => divExito.remove(), 7000);
            }
        });
    }
});