import { ref, Ref } from "vue"
//interfaz de auth
import AuthInterface from "@/interfaces/AuthInterface"
//interfaz de datos de respuesta

class AuthService {
    private jwt: Ref<String>
    private error: Ref<String>

    constructor() {
        this.jwt = ref('')
        this.error = ref('')
    }

    getJwt() {
        return this.jwt
    }

    //mandar los datos al servidor
    async login(Auth: AuthInterface): Promise<boolean> {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/usuario/autentificacion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    email: Auth.email,
                    password: Auth.password
                })
            })

            const response = await res.json()

            if (response.code !== 200) {
                this.error.value = 'Login failed';
                return false;
            }
            

            this.jwt.value = response.token
            return true
        } catch (error) {
            console.log('error' + error);
            this.error.value = 'Login failed'
            return false
        }
    }
}

export default AuthService