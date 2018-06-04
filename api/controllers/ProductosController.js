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
    getProducto: function (req, res) {
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
    getPreciosTiendas: function(req, res){
      var param = {
        codigodebarras : req.param('upc'),
      }
      Preciosproductos.query('SELECT idProduct, price, s.idMarket, (SELECT marketname FROM markets WHERE idMarket = s.idMarket) as marketname FROM productsprices s WHERE idProduct IN (SELECT idProduct FROM products WHERE codigodebarras ='+req.param('upc')+')', ['upc'], function(err, prices) {
  		  if (err) { return res.serverError(err); }
  		  res.json(prices);
  		});
    },
    getPrecioTienda: function(req, res){
      Preciosproductos.query('SELECT idProduct, price, s.idMarket, (SELECT marketname FROM markets WHERE idMarket = s.idMarket) as marketname FROM productsprices s WHERE idProduct IN (SELECT idProduct FROM products WHERE codigodebarras ='+req.param('upc')+ ' AND idMarket ='+req.param('idTienda')+')', function(err, price) {
  		  if (err) { return res.serverError(err); }
  		  res.json(price);
  		});
    },
    getTodoProductos: function(req, res){
        Productos.query('SELECT idProduct, format, description, codigodebarras, productpic FROM products', function(err,all){
          res.json(all);
          if(err){return res.serverError(err);}
        });
    },
    getProductoLike: function(req, res){
      Productos.query('SELECT idProduct, format, description, codigodebarras, productpic FROM products WHERE description LIKE "%'+req.param('search')+'%" OR codigodebarras LIKE "%'+req.param('search')+'%"', function (err, result){
        res.json(result);
        if (err) {return res.serverError(err);}
      });
    },
    savecode: function (req, res) {
        var param = {
            // Mismo nombre de la columna, requesición POST
            codigodebarras: req.param('code'),
        }
        // Modelo Productos (UPC)
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
