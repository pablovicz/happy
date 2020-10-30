import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';


const routes = Router();
const upload = multer(uploadConfig);

// Padrao MVC
//// Model
//// Views
//// Controllers

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

routes.post('/auth/authenticate', UsersController.authenticate);
routes.post('/register/user', UsersController.create);

routes.post('/forgot_password', UsersController.forgotPassword);


export default routes;