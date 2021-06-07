const { validationResult } = require("express-validator");


// validarCampos = validate fields
const validarCampos = (req,res,next) => {

  const errores = validationResult(req);

  // エラーがある場合
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped()
    });
  }

  // nextがないと実行しない
  next();

}


module.exports = {
  validarCampos
}