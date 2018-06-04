/**
 * ProductosController
 *
 * @description :: Server-side logic for managing productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getProductos: function (req, res) {
        var param = {
            codigodebarras: req.param('upc'),
        }
        Productos.find(param).exec(function (err, productos) {
            if (err) {
                console.log(err);
            }
            console.log(productos);
            res.json(productos);
        });
    },
    savecode: function (req, res) {
        var param = {
            codigodebarras: req.param('code'),
        }
        Productos.find(param).exec(function (err, productos) {
            if (err) {
                console.log(err);
            }
            console.log(productos.length);
            if (productos.length <= 0){
                Productos.create(param).exec(function (err, products) {
                    if (err) {
                        console.log(err);
                    }
                    res.status(200).json({ status: 1 });
                });
            } else {
                res.json({ status: 2, message: 'El código ya existe'});
            }
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


