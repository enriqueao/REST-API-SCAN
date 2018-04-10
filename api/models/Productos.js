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
    marca: {
      type: 'string',
      size: 25,
      columnName: 'marca'
    },
    nombreProduct: {
      type: 'string',
      size: 100,
      columnName: 'nombreProduct'
    },
    formato: {
      type: 'string',
      size: 20,
      columnName: 'formato'
    },
    idCategoriaProduct: {
      type: 'integer',
      defaultsTo: 1,
      columnName: 'idCategoriaProduct'
    },
    descripcion: {
      type: 'string',
      size: 100,
      columnName: 'descripcion'
    },
    codigodebarras: {
      type: 'string',
      size: 15,
      columnName: 'codigodebarras',
      unique: true
    },
  }
};

