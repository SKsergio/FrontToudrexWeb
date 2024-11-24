import { ref, Ref } from "vue"
//interfaz de auth
import PostInterface from "@/interfaces/PostInterface";
import GetPostInterface from "@/interfaces/GetPostInterface";
//interfaz de datos de respuesta

class Postservice {
    private Posts: Ref<GetPostInterface[]>

    constructor() {
        this.Posts = ref([]); // Inicializa el array vacío
    }

    // Método para registrar un nuevo usuario
    async registrarPosts(DataFoto: PostInterface): Promise<Response> {
        try {
            const formData = new FormData();
            formData.append("fk_usuario_id", DataFoto.fk_usuario_id.toString());
            formData.append("fk_tipoFoto_id", DataFoto.fk_tipoFoto_id.toString());
            formData.append("contenido", DataFoto.contenido.toString());
            formData.append("photo", DataFoto.photo); // El archivo de la foto

            console.log(formData);

            const response = await fetch("http://127.0.0.1:8000/api/foto/crear", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al crear publicacion: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error al registrar foto:", error);
            throw error;
        }
    }

    //obtener post de un usuario por id
    async postfetch(id: number): Promise<void> {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicacion/find/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`No se han encontrado datos: ${response.statusText}`);
            }

            const jsonresponse = await response.json();
            this.Posts.value = jsonresponse.data; // Aquí se asignan los datos directamente
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    }

    getPosts(): GetPostInterface[] {
        return this.Posts.value; // Devuelve solo el valor
    }
    
}

export default Postservice