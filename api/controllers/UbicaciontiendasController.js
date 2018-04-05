/**
 * UbicaciontiendasController
 *
 * @description :: Server-side logic for managing ubicaciontiendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getPublicaciones: function (req, res) {
        User.find().exec(function (err, user) {
            if (err) {
                console.log(err);
            }
            res.json(user);
        });
    },

    save: function (req, res) {
        var param = {
            idUsuario: req.param('idUsuario'),
            lat: req.param('lat'),
            lng: req.param('lng'),
            costo: req.param('costo'),
            descripcion: req.param('descripciones'),
            idZonaInmueble: req.param('idZonaInmueble'),
            huespedes: req.param('huespedes')
        }

        Publicacion.create(param).exec(function (err, publish) {
            if (err) {
                sails.log(err);
            }
            return res.ok(publish);
        });

    },

    saveAdd: function (req, res) {
        var restric = req.param('restricciones');
        var service = req.param('servicios');

        var insert = [];
        for (var i = 0; i < restric.length; i++) {
            insert.push({
                idPublicacion: req.param('idPublicacion'),
                idTipoRestriccion: restric[i]
            });
        }

        var insertService = [];
        for (var i = 0; i < service.length; i++) {
            insertService.push({
                idPublicacion: req.param('idPublicacion'),
                idTipoServicio: service[i]
            });
        }

        RestriccionesInmuebles.create(insert).exec(function (err, publish) {
            if (err) {
                sails.log(err);
            }
        });

        ServiciosInmueble.create(insertService).exec(function (err, publish) {
            if (err) {
                sails.log(err);
            }
            return res.ok(publish);
        });
    },

    uploadImg: function (req, res) {
        res.setTimeout(0);
        // console.log(sails.config.appPath);
        req.file('1').upload({
            maxBytes: 20000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/publicaciones')
        }, function (err, uploadedFiles) {
            if (err) return res.negotiate(err);
            Publicacion.update({ idPublicacion: req.param("dataimg") },
                {
                    dirImagenuno: uploadedFiles[0].fd.split('\\').pop(),
                    dirImagendos: uploadedFiles[1].fd.split('\\').pop(),
                    dirImagentre: uploadedFiles[2].fd.split('\\').pop(),
                    dirImagencua: uploadedFiles[3].fd.split('\\').pop()
                }
            ).exec(function (err, users) {
                console.log("done");
            });
            return res.json({
                message: uploadedFiles.length
            });
        });
    },

    update: function (req, res) {
        Category.update({ idPublicacion: req.param('idPublicacion') }, {
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
        Category.destroy({ idPublicacion: req.param('idPublicacion') }).exec(function (err, users) {
            console.log("done");
        });
        return;
    },

    getMyPublicaciones: function (req, res) {
        Publicacion.find({ idUsuario: req.param("idUsuario") }).exec(function (err, myposts) {
            if (err) {
                return res.json(500, { message: 'Hubo un problema. Inténtalo de nuevo.' });
            }
            return res.ok(myposts);
        });
    },

    getDataPublicacion: function (req, res) {
        Publicacion.query('SELECT * FROM publicacion p, usuarios u WHERE p.idPublicacion =' + req.param("idPublicacion") + ' AND u.idUsuario = p.idUsuario', ['idPublicacion'], function (err, rawResult) {
            if (err) { return res.serverError(err); }
            // sails.log(rawResult);
            // res.json(rawResult);
            return res.ok(rawResult);
        });
    },

    getServicesPost: function (req, res) {
        Publicacion.query('SELECT descripcion FROM serviciosinmueble sim, tiposservicio ts WHERE idPublicacion = ' + req.param("idPublicacion") + ' AND sim.idTipoServicio = ts.idTipoServicio;', ['idPublicacion'], function (err, rawResult) {
            if (err) { return res.serverError(err); }
            // sails.log(rawResult);
            // res.json(rawResult);
            return res.ok(rawResult);
        });
    },

    getRestrictionsPost: function (req, res) {
        Publicacion.query('SELECT descripcion FROM restriccionesinmuebles res, tiposrestriccion tr WHERE idPublicacion = ' + req.param("idPublicacion") + ' AND res.idTipoRestriccion = tr.idTipoRestriccion;', ['idPublicacion'], function (err, rawResult) {
            if (err) { return res.serverError(err); }
            // sails.log(rawResult);
            // res.json(rawResult);
            return res.ok(rawResult);
        });
    },
};
