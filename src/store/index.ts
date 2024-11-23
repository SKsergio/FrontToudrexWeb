import { createStore } from 'vuex'
import AuthInterface from '@/interfaces/AuthInterface'
import UserInterface from '@/interfaces/UserInterface';

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
        },
        setError(state, errorMessage) {
            state.error = errorMessage;
        },
        setUsuario(state, usuario: UserInterface) {
            state.usuario = usuario;
        },
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
                        email: Auth.email,
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
        }
    },
    modules: {
    }
})