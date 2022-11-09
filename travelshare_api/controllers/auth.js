const { User, Token } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (password.length < 6)
    return next(
      new ErrorResponse("Contraseña debe tener al menos 6 caracteres", 400)
    );

  try {
    const username_check = await User.findOne({ where: { username } });

    if (username_check)
      return next(new ErrorResponse("Nombre de usuario ya existe", 400));

    const user_check = await User.findOne({ where: { email } });

    if (user_check) return next(new ErrorResponse("Correo ya existe", 400));

    const salt = await bcrypt.genSalt(10);

    const password_hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: password_hash,
    });

    createToken(user, 201, res);
  } catch (error) {
    return next(new Error("Error al crear el usuario"));
  }
};
const createToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  const refreshToken = user.getRefreshToken();

  const savedToken = await Token.create({
    token: refreshToken,
    uuid: user.uuid,
  });

  if (!savedToken) res.status(500).json("Error accessing database");
  else
    res
      .status(statusCode)
      .json({ token, refreshToken, username: user.username });
};
