document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos después de que el DOM esté completamente cargado
    let cantidad = document.getElementById("cantidad");
    let botonGenerar = document.getElementById("generar");
    let contrasena = document.getElementById("contrasena");
    let botonLimpiar = document.getElementById("limpiar");
    let mensaje = document.getElementById("mensaje");

    const cadenaCaracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghjiklmnñopqrstuvwxyz0123456789-_.:,;¡¿?!#@{[]}$%^&*()";

    // Función para generar la contraseña
    function generar() {
        let numeroDigitado = parseInt(cantidad.value);
        let password = "";

        if (numeroDigitado < 6 || numeroDigitado >20) {
            alert("La cantidad de caracteres para generar minimo debe ser 6 y maximo 20.");
        } else {
            for (let i = 0; i < numeroDigitado; i++) {
                let caracterAleatorio = cadenaCaracteres[Math.floor(Math.random() * cadenaCaracteres.length)];
                password += caracterAleatorio;
            }
            contrasena.value = password;
            mensaje.textContent = validarFuerzaContrasena(password); // Mostrar el mensaje de fuerza
        }
    }

    // Función para limpiar el formulario
    function limpiar() {
        cantidad.value = "";
        contrasena.value = "";
        mensaje.textContent = ""; // Limpiar el mensaje
    }

    // Función para validar la fuerza de la contraseña
    function validarFuerzaContrasena(cadena) {
        const soloLetras = /^[A-Za-z]+$/;
        const soloNumeros = /^[0-9]+$/;
        const contieneLetras = /[A-Za-z]/;
        const contieneNumeros = /[0-9]/;
        const contieneEspeciales = /[^A-Za-z0-9]/;


        if (soloLetras.test(cadena) || soloNumeros.test(cadena)) {
            return "Débil: Solo contiene letras o solo números.";
        } else if (contieneLetras.test(cadena) && contieneNumeros.test(cadena) && !contieneEspeciales.test(cadena)) {
            return "Moderada: Contiene letras y números.";
        } else if (contieneLetras.test(cadena) && contieneEspeciales.test(cadena) && !contieneNumeros.test(cadena)) {
            return "Moderada: Contiene letras y caracteres especiales.";
        } else if (contieneEspeciales.test(cadena) && contieneNumeros.test(cadena) && !contieneLetras.test(cadena)) {
            return "Moderada: Contiene números y caracteres especiales.";
        } else if (contieneLetras.test(cadena) && contieneNumeros.test(cadena) && contieneEspeciales.test(cadena)) {
            return "Fuerte: Contiene letras, números y caracteres especiales.";
        } else {
            return "Formato no válido.";
        }
    }

    // Agregar evento para mostrar la fuerza de la contraseña solo si tiene valor
    contrasena.addEventListener("input", function() {
        if (contrasena.value !== "") {
            mensaje.textContent = validarFuerzaContrasena(contrasena.value);
        } else {
            mensaje.textContent = ""; // Limpiar si está vacío
        }
    });

    // Asignar los eventos a los botones
    botonGenerar.onclick = generar;
    botonLimpiar.onclick = limpiar;
});




