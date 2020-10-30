import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

// Rota = conjunto para listar usuários
// app.get('/users', (request, response) => {
//     return response.json({ message: 'Hello World' });
// })

// Recurso = usuarios
// Métodos HTTP = GET/POST/DELETE/PUT
//// GET = Buscar informação
//// POST = criando informação
//// PUT = editando informação
//// DELETE = deletando informação

// Parâmetros =  
//// QuerryParams -> http://localhost:3333/users?search=diego
//// Route Params -> http://localhost:3333/users/1 (identificar um recurso)
//// Body: informações maiores sobre o recurso

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);


app.listen(3333);

//fluxo do node -> requisicao e resposta
// lcoalhost:3333