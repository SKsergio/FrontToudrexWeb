import { ref, Ref } from "vue"
//interfaz de auth
import PhotoInterface from "@/interfaces/PhotoInterface";
//interfaz de datos de respuesta

class PhotoService {
    private Foto: Ref<PhotoInterface[]>

    constructor() {
        this.Foto = ref([]); // Inicializa el array vacío
    }

    // Método para registrar un nuevo usuario
    async registerFoto(DataFoto: PhotoInterface): Promise<Response> {
        try {
            const formData = new FormData();
            formData.append("fk_usuario_id", DataFoto.fk_usuario_id.toString());
            formData.append("fk_tipoFoto_id", DataFoto.fk_tipoFoto_id.toString());
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
                throw new Error(`Error en la petición: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error("Error al registrar foto:", error);
            throw error;
        }
    }
    
}

export default PhotoService