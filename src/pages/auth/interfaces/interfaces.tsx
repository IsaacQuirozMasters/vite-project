// Definición de la interfaz 'LoginInput'
export interface LoginInput {
    email: string;    // Propiedad 'email' de tipo 'string' que representa la dirección de correo electrónico
    password: string; // Propiedad 'password' de tipo 'string' que representa la contraseña
  }
  
  // Definición de la interfaz 'RegisterInput' que extiende de 'LoginInput'
  export interface RegisterInput extends LoginInput {
    userName: string; // Propiedad 'userName' de tipo 'string' que representa el nombre de usuario
  }
  