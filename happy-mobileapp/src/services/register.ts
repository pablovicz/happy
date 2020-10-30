import api from './api';


interface Response {
    user: {
        name: string;
        email: string;
    }
}

export async function register(name: string, email: string, password: string) {

    const response = await api.post('/register/user', {
        name: name,
        email: email,
        password: password,
    }
    );

    return response.data as Response;

}