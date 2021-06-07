const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      });
    }


    const usuario = new Usuario(req.body);

    // パスワードの暗号化
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    // mongoDBに保存　
    await usuario.save();

    // JWTの生成
    const token = await generarJWT(usuario.id)

    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

}


const login = async (req, res = response) => {

  const {email, password} = req.body;

  try {

    //　登録確認
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB){
      return res.status(404).json({
        ok:false,
        msg: 'Email no encontrado'
      });
    }

    // パスワードの検証
    // bcrypt で　入力したパスワード　登録済みパスワードを　比較
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );
    if ( !validPassword){
      return res.status(400).json({
        ok:false,
        msg: 'La contrasena no es valida'
      });
    }

    // JWT の生成
    const token = await generarJWT( usuarioDB.id );

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });

    
  } catch (error) {
    console.log(error);
    return res.status[500].json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

const renewToken = async(req,res=response)=>{
  // response で　ユーザー情報とトークンを表示
  const uid = req.uid;

  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token
  })
}


module.exports = {
  crearUsuario,
  login,
  renewToken
}