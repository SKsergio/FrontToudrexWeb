import { createStore } from 'vuex'
import AuthInterface from '@/interfaces/AuthInterface'
import UserInterface from '@/interfaces/UserInterface';
import UserService from '@/services/UserService';

//Nueva instnacia del servicio
const userService = new UserService();

export default createStore({
    state: {
        jwt: '',
        error: '',
        usuario: {} as UserInterface
    },
    getters: {
        getUser(state): UserInterface {
            return state.usuario;
        },
        getToken(state) {
            return state.jwt
        },
        getError(state){
            return state.error
        }
    },
    mutations: {
        setJwt(state, token) {
            state.jwt = token;
            localStorage.setItem('jwt', token); // Guardar token
        },
        setError(state, errorMessage) {
            state.error = errorMessage;
        },
        setUsuario(state, usuario: UserInterface) {
            state.usuario = usuario;
            localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar usuario
        },
        clearSession(state) {
            state.jwt = '';
            state.usuario = {} as UserInterface;
            localStorage.removeItem('jwt'); // Limpiar token
            localStorage.removeItem('usuario'); // Limpiar usuario
        }
    },
    actions: {
        async login({ commit }, Auth: AuthInterface): Promise<boolean> {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/usuario/autentificacion', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre_usuario: Auth.nombre_usuario,
                        password: Auth.password
                    })
                });

                const response = await res.json();

                if (response.code !== 200) {
                    commit('setError', 'Login failed');
                    return false;
                }

                commit('setJwt', response.token);
                commit('setUsuario', response.data);
                return true;
            } catch (error) {
                console.error('Error:', error);
                commit('setError', 'Login failed');
                return false;
            }
        },
        async registerUser({ commit }, userData: UserInterface): Promise<boolean> {
            try {
                // Llamar al servicio para registrar al usuario
                const response = await userService.registerUser(userData);

                if (!response || !response.ok) {
                    commit('setError', 'Registro fallido');
                    return false;
                }

                const result = await response.json();

                // Suponiendo que la API devuelve el usuario recién creado
                commit('setUsuario', result.data);
                return true;
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                commit('setError', 'Registro fallido');
                return false;
            }
        },
        async logout({ commit }) {
            commit('clearSession');
        },
    },
    modules: {
    }
})