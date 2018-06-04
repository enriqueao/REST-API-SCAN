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
                datos.user = users;
                res.json(datos);
            }
            if (users.length == 1){
                datos.status = 1;
                datos.msg = "Bienvenido";
                datos.user = users;
                res.json(datos);
            } else {
                datos.status = 2;
                datos.msg = "Contraseña o correo incorrectos";
                datos.user = users;
                res.json(datos);
            }
        });
    },
    createUser: (req, res)=> {
        // console.log(req.file('imgProfile'));
        var user = {
            email: req.param('email'),
            password: req.param('password'),
            name: req.param('name'),
            lastname: req.param('lastName'),
        }
        console.log(user);
        var param = {
            email: req.param('email'),
        }
        Users.find(param).exec(function (err, users) {
            if (err) {
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            if (users.length == 0) {
                Users.create(user).exec(function (err, users) {
                    if (err) {
                        res.json({ status: 3, msg: 'Intente más tarde' });
                    }
                    res.status(200).json({ status: 1, msg: 'Registrado Correctamente' });
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
};

