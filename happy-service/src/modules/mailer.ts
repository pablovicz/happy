import nodemailer from 'nodemailer';
import path from 'path';

const hbs = require('nodemailer-express-handlebars');
//const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "013afccf4462f5",
        pass: "c9d0225a0bf18f"
    }
});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('../src/resources/mail'),
    extName: '.html',
}));

export default transport;