import { ref, Ref } from "vue"
//interfaz de auth
import UserInterface from "@/interfaces/UserInterface"
//interfaz de datos de respuesta

class UserService {
    private Users: Ref<UserInterface[]>

    constructor() {
        this.Users = ref([]); // Inicializa el array vacío
    }

    // Método para registrar un nuevo usuario
    async registerUser(userData: UserInterface): Promise<Response> {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/usuario/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error(`Error en el registro: ${response.statusText}`);
            }
    
            return response; // Devuelve la respuesta HTTP para ser procesada después
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error; // Propaga el error para manejarlo fuera de este método
        }
    }
    
}

export default UserService