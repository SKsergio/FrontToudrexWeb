import { ref, Ref } from "vue"
//interfaz de auth
import UserInterface from "@/interfaces/UserInterface"
//interfaz de datos de respuesta

class UserService {
    private Users: Ref<Array<UserInterface>>

    private User: Ref<UserInterface | null>;

    constructor() {
        this.Users = ref<Array<UserInterface>>([]);
        this.User = ref<UserInterface | null>(null);
    }

    getUsers():Ref<Array<UserInterface>>{
        return this.Users
    }

    getUser(): Ref<UserInterface | null> {
        return this.User;
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

    //buscar usuarios
    async findUser(parametro:string):Promise<void>{
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/usuario/buscar?query=${parametro}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                console.error(`No se han encontrado datos: ${response.statusText}`);
                alert('No coinciden usuarios');
                return; // Detén la ejecución aquí
            }
    
            const jsonresponse = await response.json();
    
            if (Array.isArray(jsonresponse.data)) {
                this.Users.value = jsonresponse.data;
            } else {
                console.warn('La respuesta no contiene datos válidos:', jsonresponse);
                this.Users.value = []; // Asegura un valor consistente
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error; // Propaga el error para manejarlo fuera de este método
        }
    }

    //obtener usuario por id
    async findOne(id:number):Promise<void>{
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/usuario/find/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`No se han encontrado el usuaio`);
            }
            const jsonresponse = await response.json()
            this.User.value = await jsonresponse.data;

    
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error; // Propaga el error para manejarlo fuera de este método
        }
    }
    
}

export default UserService