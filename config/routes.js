/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // },

  /******************************PRODUCTOS***********************************/
  'POST /scanmarket/product/savecode': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'savecode'
  },

  'GET /scanmarket/product/getProductos': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getProductos'
  },

  'GET /scanmarket/product/getProducto': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getProducto'
  },

  'GET /scanmarket/product/getPreciosTiendas': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getPreciosTiendas'
  },

  'GET /scanmarket/product/getPrecioTienda': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getPrecioTienda'
  },

  'GET /scanmarket/product/getTodoProductos': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getTodoProductos'
  },

  'GET /scanmarket/product/getProductoLike': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'getProductoLike'
  },

  'POST /scanmarket/product/createProduct': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'ProductosController',
    action: 'createProduct'
  },
  /**************************USUARIOS**********************************************/
  'GET /scanmarket/user/login': {
    cors:{
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'loginUser'
  },

  'POST /scanmarket/user/create': {
    cors:{
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'createUser'
  },

  'POST /scanmarket/user/update': {
    cors:{
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'updateUser'
  },

  'POST /scanmarket/user/updatePass': {
    cors:{
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'updatePassword'
  },
  
  'POST /scanmarket/user/updateImgProfile': {
    cors:{
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'updateImgProfile'
  },

  'POST /scanmarket/user/codeConfirm': {
    cors: {
      origin: '*',
      headers: 'Content-Type, Authorization'
    },
    controller: 'UsersController',
    action: 'codeConfirm'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
