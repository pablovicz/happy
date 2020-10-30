import api from './api';


interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
    error: string;
}

export async function signIn(email: string, password: string) {


    const response = await api.post('/auth/authenticate', {
        email: email,
        password: password
    });


    return response.data as Response;



}



// export function signIn(): Promise<Response> {

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 token: 'aiufiduabfdsbfgiudsabfgdaspbgdsaubsdadsivbdsaupiadsnvapsiun',
//                 user: {
//                     name: 'Pablo',
//                     email: 'pablo@gmail.com',
//                 }
//             })

//         }, 2000);
//     });
// }