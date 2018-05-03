/**
 * Productos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  attributes: {
    idProduct: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idProduct'
    },
    format: {
      type: 'string',
      size: 25,
      columnName: 'format'
    },
    description: {
      type: 'string',
      size: 250,
      columnName: 'description'
    },
    codigodebarras: {
      type: 'string',
      size: 15,
      columnName: 'codigodebarras',
      unique: true
    },
    productpic: {
      type: 'string',
      size: 400,
      defaultsTo:"https://vignette.wikia.nocookie.net/monsterhunterespanol/images/a/aa/Imagen-no-disponible-282x300.png",
      columnName: 'productpic',
    }
  }
};

