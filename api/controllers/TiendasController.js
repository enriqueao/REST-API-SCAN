/**
 * TiendasController
 *
 * @description :: Server-side logic for managing tiendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getPagosPublicidad: function (req, res) {
        User.find().exec(function (err, user) {
            if (err) {
                console.log(err);
            }
            res.json(user);
        });
    },

    save: function (req, res) {
        var param = {
            idPublicacion: req.param('idPublicacion'),
            idTipoPublicidad: req.param('idTipoPublicidad'),
            fechaInicio: req.param('fechaInicio'),
            idTipoUsuario: req.param('idTipoUsuario')
        }
        User.create(param).exec(function (err, users) {
            console.log("done");
        });
    },

    update: function (req, res) {
        Category.update({ idPagoPublicidad: req.param('idPagoPublicidad') }, {
            idPublicacion: req.param('idPublicacion'),
            idTipoPublicidad: req.param('idTipoPublicidad'),
            fechaInicio: req.param('fechaInicio'),
            idTipoUsuario: req.param('idTipoUsuario')
        }).exec(function (err, users) {
            console.log("done");
        });
        return;
    },

    delete: function (req, res) {
        Category.destroy({ idPagoPublicidad: req.param('idPagoPublicidad') }).exec(function (err, users) {
            console.log("done");
        });
        return;
    }

};

