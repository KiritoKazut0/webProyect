export const username = (name) => {  
    const regex = /^[a-zA-Z\s]{5,}$/;

    if (name === ""){
        return "El campo no puede estar vacío";
    } 
    if (!regex.test(name)) {
        return "El nombre debe contener solo letras y tener al menos 5 caracteres";
    } else {
        return null;
    }
};

export const password = (password) => {
    if (password === ""){
        return "La contraseña no puede estar vacía";
    }
    if (password.length < 4) {
        return "La contraseña debe tener al menos 4 caracteres";
    }
    return null;
};

export const email = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (correo === "") {
        return "El campo no puede estar vacío";
    } 
    if (!regex.test(correo)) {
        return "Ingrese un correo electrónico válido";
    } else {
        return null;
    }
};
