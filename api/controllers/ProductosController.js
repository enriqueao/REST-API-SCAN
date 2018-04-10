/**
 * ProductosController
 *
 * @description :: Server-side logic for managing productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getPublicaciones: function (req, res) {
        Productos.find().exec(function (err, productos) {
            if (err) {
                console.log(err);
            }
            res.json(productos);
        });
    },

    savecode: function (req, res) {
        var param = {
            codigodebarras: req.param('code'),
        }
        Productos.create(param).exec(function (err, users) {
            if (err) {
                console.log(err);
                res.json({ status: 2});
            }
            res.json({status: 1});
        });
    },

    update: function (req, res) {
        Productos.update({ idPublicacion: req.param('idPublicacion') }, {
            lat: req.param('lat'),
            lng: req.param('lng'),
            costo: req.param('costo'),
            descripciones: req.param('descripciones'),
            telefono: req.param('telefono'),
            fechaPublicacion: req.param('fechaPublicacion'),
            fechavencimiento: req.param('fechavencimiento'),
            zonainmueble: req.param('zonainmueble')
        }).exec(function (err, users) {
            console.log("done");
        });
        return;
    },

    delete: function (req, res) {
        Productos.destroy({ idPublicacion: req.param('idPublicacion') }).exec(function (err, users) {
            console.log("done");
        });
        return;
    }
};


