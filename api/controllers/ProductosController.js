/**
 * ProductosController
 *
 * @description :: Server-side logic for managing productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getProductos: function (req, res) {
        Productos.find().exec(function (err, productos) {
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error Inesperedo', data: [] });
            }
            res.status(200).json({ status: 3, msg: 'Correcto', data: productos });
        });
    },

    getProducto: function (req, res) {
        var param = {
            codigodebarras: req.param('upc'),
        }
        Productos.find(param).exec(function (err, productos) {
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error', data: [] });
            }
            res.status(200).json({ status: 1, msg: 'Producto Encontrado', data: productos });
          });
    },

    getPreciosTiendas: function(req, res){
      var param = {
        codigodebarras : req.param('upc'),
      }
      Preciosproductos.query('SELECT idProduct, price, s.idMarket, (SELECT marketname FROM markets WHERE idMarket = s.idMarket) as marketname FROM productsprices s WHERE idProduct IN (SELECT idProduct FROM products WHERE codigodebarras ='+req.param('upc')+')', ['upc'], function(err, prices) {
  		    if (err) { 
                res.status(200).json({ status: 3, msg: 'Error', data: [] }); 
            }
            res.status(200).json({ status: 1, msg: 'Producto Encontrado', data: prices });
  		});
    },

    getPrecioTienda: function(req, res){
      Preciosproductos.query('SELECT idProduct, price, s.idMarket, (SELECT marketname FROM markets WHERE idMarket = s.idMarket) as marketname FROM productsprices s WHERE idProduct IN (SELECT idProduct FROM products WHERE codigodebarras ='+req.param('upc')+ ' AND idMarket ='+req.param('idTienda')+')', function(err, price) {
          if (err) {
              res.status(200).json({ status: 3, msg: 'Error', data: [] });
          }
          res.status(200).json({ status: 1, msg: 'Producto Encontrado', data: prices });
  		});
    },

    getTodoProductos: function(req, res){
        Productos.query('SELECT idProduct, format, description, codigodebarras, productpic FROM products', function(err, all){
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error', data: [] });
            }
            res.status(200).json({ status: 1, msg: 'Producto Encontrado', data: all });
        });
    },

    getProductoLike: function(req, res){
      Productos.query('SELECT idProduct, format, description, codigodebarras, productpic FROM products WHERE description LIKE "%'+req.param('search')+'%" OR codigodebarras LIKE "%'+req.param('search')+'%"', function (err, result){
          if (err) {
              res.status(200).json({ status: 3, msg: 'Error', data: [] });
          }
          res.status(200).json({ status: 1, msg: 'Producto Encontrado', data: result });
      });
    },

    savecode: function (req, res) {
        var param = {
            codigodebarras: req.param('code'),
        }
        Productos.find(param).exec(function (err, productos) {
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error', data: [] });
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
        //Update where columna
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
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error', data: [] });
            }
            res.status(200).json({ status: 1, msg: 'Correcto', data: [] });
        });
        return;
    },

    delete: function (req, res) {
        Productos.destroy({ idPublicacion: req.param('idPublicacion') }).exec(function (err, users) {
            if (err) {
                res.status(200).json({ status: 3, msg: 'Error', data: [] });
            }
            res.status(200).json({ status: 1, msg: 'Correcto', data: result });
        });
    },

    createProduct: (req, res)=>{
        var product = {
            format: req.param('format'),
            description: req.param('description'),
            codigodebarras: req.param('codigodebarras'),
        }
        Productos.create(product).exec(function (err, create) {
            if (err) {
                res.json({ status: 3, msg: 'Intente más tarde' });
            }
            res.status(200).json({ status: 1, msg: 'Registrado Correctamente' });
        });
    },
};
