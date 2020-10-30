import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import userView from '../views/users_view';
import mailer from '../modules/mailer';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';
import crypto from 'crypto';



require('dotenv-safe').config();


export default {



    async show(request: Request, response: Response) {

        const { id } = request.params;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail(id);

        return response.json(userView.render(user));
    },

    async authenticate(request: Request, response: Response) {

        const SECRET = process.env.SECRET?.toString;

        const {
            email,
            password,
        } = request.body;

        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ email: email });

        if (!user) {

            return response.status(400).json({ error: "usuário não encontrado!" });
        }

        const userEmail = user.email;
        const userPassword = await bcrypt.compare(request.body.password, user.password);
        const id = user.id;

        if (request.body.email !== userEmail) {

            return response.status(400).json({ error: "Login inválido!" });
        }

        if (userPassword === false) {

            return response.status(400).json({ error: "Senha inválida!" });
        }


        const authHeader = request.headers.authorization as string;


        if (!authHeader) {

            console.log('criando novo token');

            var token = jwt.sign({ id: id }, "A$S&V&N&X@12358132134@", { expiresIn: 300 });

            console.log(`o token é ${token}`);

            const userAutenticado = {
                'token': token,
                user: {
                    'name': user.name,
                    'email': user.email,
                }
            }

            return response.status(201).json(userAutenticado);
        }

        try {

            const auth = await promisify(jwt.verify)(authHeader.split(' ')[1], "A$S&V&N&X@12358132134@");


        } catch (err) {

            console.log("token expirado");

            console.log('token expirado, criando novo token');

            var token = jwt.sign({ id: id }, "A$S&V&N&X@12358132134@", { expiresIn: 300 });

            console.log(`o token é ${token}`);

            const userAutenticado = {
                'token': token,
                user: {
                    'name': user.name,
                    'email': user.email,
                }
            }

            return response.status(201).json(userAutenticado);
        }

        console.log('usando token ativo');

        const authUser = await usersRepository.findOne({ id: auth.id });

        const resUser = userView.render(authUser as User);

        const userAutenticado = {
            'token': authHeader,
            user: {
                'name': resUser.name,
                'email': resUser.email,
            }
        }

        return response.status(201).json(userAutenticado);

    },

    async create(request: Request, response: Response) {

        const {
            name,
            email,
            password,
        } = request.body;

        const usersRepository = getRepository(User);


        const data = {
            name,
            email,
            password,
            create_date: Date.now(),
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        console.log(`a senha enviada é ${data.password}`);

        data.password = await bcrypt.hash(data.password, 8);

        //console.log(`a senha encriptada é ${hash}`)

        //const decript = await bcrypt.compare("asevenex", hash);
        //console.log(`a senha decriptada é ${decript}`)

        const user = usersRepository.create(data);

        await usersRepository.save(user);

        return response.status(201).json(user);
    },

    async forgotPassword(request: Request, response: Response) {

        const { email } = request.body;

        try {

            const usersRepository = getRepository(User);

            const user = await usersRepository.findOne({ email });

            console.log(user);

            if (!user) {

                return response.status(400).send({ error: 'Usuário não encontrado!' });
            }

            const token = jwt.sign({ id: user.id, email: user.email },
                "A$S&V&N&X@12358132134@",
                { expiresIn: 3000 }
            );

            console.log(token);

            var emailOptions = {
                to: email,
                from: "pablowoina2205@gmail.com",
                template: "forgot_password",
                context: { token },
            };

            mailer.sendMail(emailOptions, (err: any) => {

                if (err) {
                    console.log(err);
                    return response.status(400).send({ error: 'Cannot send forgot password email' });
                }

                return response.send();
            });

        } catch (err) {

            response.status(400).send({ error: 'Error on forgot password, try again' });
        }

    }

};