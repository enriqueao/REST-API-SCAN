/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    loginUser: (req, res)=> {
        var param = {
            password: req.param('password'),
            email: req.param('email'),
        }
        Users.find(param).exec(function (err, users) {
            var datos = {};
            if (err) {
                datos.status = 3;
                datos.msg = "Error Intente más tarde";
                datos.data = users;
                res.json(datos);
            }
            if(users.status == 0){
                datos.status = 2;
                datos.msg = "Debe confirmar el código de verificación";
                datos.data = users;
                res.json(datos);
            }
            if (users.length == 1){
                datos.status = 1;
                datos.msg = "Bienvenido";
                datos.data = users;
                res.json(datos);
            } else {
                datos.status = 2;
                datos.msg = "Contraseña o correo incorrectos";
                datos.data = users;
                res.json(datos);
            }
        });
    },
    createUser: (req, res)=> {
        var code = Math.floor((Math.random() * 999999999) + 111001001);
        var user = {
            email: req.param('email'),
            password: req.param('password'),
            name: req.param('name'),
            lastname: req.param('lastName'),
            img: 'Default.jpg',
            code: code,
        }
        var param = {
            email: req.param('email'),
        }
        var mailOptions = {
            from: "noreply@scanmart.com",
            subject: 'Código de Verificación ScanMart',
            text: code.toString(),
        };
        mailOptions.to = req.param('email');
        Users.find(param).exec(function (err, users) {
            if (err) {
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            if (users.length == 0) {
                req.file('imgProfile').upload({
                    maxBytes: 20000000,
                    dirname: require('path').resolve(sails.config.appPath, 'assets/images/profile')
                }, function (err, uploadedFiles) {
                    if (err) {
                        res.json({ status: 3, msg: 'Error al subir imagen de perfil' });
                    } else {
                        user.img = uploadedFiles[0].fd.split('\\').pop();
                    }
                    Users.create(user).exec(function (err, users) {
                        if (err) {
                            res.json({ status: 3, msg: 'Intente más tarde' });
                        }
                        let nodemailer = require('nodemailer');
                        var transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'noreplysaluduaq@gmail.com',
                                pass: '@saluduaq'
                            },
                            port: 465,
                            secure: true,
                        });
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                Users.destroy(param).exec(function (err, users) {
                                    if (err) {
                                        res.status(200).json({ status: 3, msg: 'Error', data: [] });
                                    }
                                    res.json({ status: 3, msg: 'Intente más tarde, error en el servicio de correo' });
                                });
                            } else {
                                res.status(200).json({ status: 1, msg: 'Registrado Correctamente' });
                            }
                        });
                    });
                });
            } else {
                res.json({ status: 2, msg: 'El correo ya se encuentra registrado' });
            }
        });
    },
    updateUser: (req, res)=> {
        Users.update({ idUser: req.param('idUser') }, {
            email: req.param('email'),
            name: req.param('name'),
            lastname: req.param('lastName'),
        }).exec((err, users)=> {
            if(err){
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            res.json({ status: 1, msg: 'Actualización correcta' });
        });
    },
    updatePassword: (req, res)=>{
        Users.update({ idUser: req.param('idUser') }, {
            password: req.param('password'),
        }).exec((err, users) => {
            if (err) {
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            res.json({ status: 1, msg: 'Actualización correcta' });
        });
    },
    updateImgProfile: (req, res)=>{
        Publicacion.update({ idUser: req.param("idUser") },
            { img: req.param("imgProfile")}
        ).exec(function (err, users) {
            res.status(200).json({ status: 1, msg: 'Actualización correcta' });
        });
    },
    codeConfirm: (req, res)=>{
        let param = {
            email: req.param('email'), 
            code: req.param('code')
        };
        Users.find(param).exec(function (err, users) {
            if (err) {
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            if (users.length == 1) {
                Users.update({ email: req.param('email'), code: req.param('code') }, {
                    status: 1,
                }).exec((err, users) => {
                    if (err) {
                        res.json({ status: 3, msg: 'Intente más tarde' });
                    }
                    res.json({ status: 1, msg: 'Código Confirmado' });
                });
            } else {
                res.json({ status: 2, msg: 'Código Incorrecto' });
            }
        });
    },
};

