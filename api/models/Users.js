/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    idUser: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idUser'
    },
    email: {
      type: 'string',
      size: 50,
      columnName: 'email',
      unique: true
    },
    password: {
      type: 'string',
      size: 200,
      columnName: 'password'
    },
    img: {
      type: 'string',
      size: 200,
      columnName: 'img',
      defaultsTo: 'Algo'
    },
    name: {
      type: 'string',
      size: 20,
      columnName: 'name'
    },
    lastname: {
      type: 'string',
      size: 40,
      columnName: 'lastname'
    },
    code: {
      type: 'string',
      size: 9,
      columnName: 'code',
    },
    status: {
      type: 'integer',
      columnName: 'status',
      defaultsTo: 0,
    },
  }
};
