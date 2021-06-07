const { Schema, model } = require('mongoose');

const UsuariosSchema = Schema({

  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },

});

// レスポンスデータの整形  必ず　function(){}
UsuariosSchema.method('toJSON', function () {
  // __v,_id,password レスポンスから削除
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id; // uid として _id の値を返す
  return object;
})

module.exports = model('Usuario', UsuariosSchema);