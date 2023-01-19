const { User, Token } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

exports.register = async (req, res, next) => {
  const valid = validateUserInfo(req.body);

  if (!valid)
    return res.status(400).json({ error: "User info should be complete" });
  const { name, lastname, username, email, password } = req.body;

  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters" });

  const validEmail = validateEmail(email);

  if (!validEmail)
    return res.status(400).json({ error: "Email format is not correct" });

  try {
    const username_check = await User.findOne({ where: { username } });

    if (username_check)
      return res.status(409).json({ error: "Username already exists" });

    const user_check = await User.findOne({ where: { email } });

    if (user_check)
      return res.status(409).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);

    const password_hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      uuid: uuid.v4(),
      name,
      lastname,
      username,
      email,
      password: password_hash,
    });

    const { token, refreshToken } = createToken(user);

    const savedToken = await Token.create({
      token: refreshToken,
      uuid: user.uuid,
    });

    if (!savedToken)
      res.status(500).json({ error: "Error accessing database" });
    else res.status(201).json({ token, refreshToken, username: user.username });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ error: "Username or password incorrect" });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user)
      return res.status(401).json({ error: "Username or password incorrect" });

    const isMatch = await user.matchPasswords(password);

    if (!isMatch)
      return res.status(401).json({ error: "Username or password incorrect" });

    const { token, refreshToken } = createToken(user);

    const savedToken = await Token.update(
      {
        token: refreshToken,
        uuid: user.uuid,
      },
      {
        where: { uuid: user.uuid },
      }
    );

    if (!savedToken)
      res.status(500).json({ error: "Error accessing database" });
    else {
      res.status(200).json({ token, refreshToken, username: user.username });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  const user = req.user;

  try {
    const token = await Token.findOne({ where: { id: user.uuid } });

    if (token.token !== refreshToken)
      return next(new ErrorResponse("Tokens not matching"));
  } catch (error) {
    return next(new ErrorResponse("Database Error"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    if (decoded.id !== user.uuid)
      return next(new ErrorResponse("User unknown"));
    res.status(304).json("Unmodified");
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      sendToken(user, 201, res);
    } else {
      res.status(500).json("Error: " + err);
    }
  }
};

exports.logout = async (req, res, next) => {
  const user = req.user;

  const savedToken = await Token.update(
    {
      token: "",
      uuid: user.uuid,
    },
    {
      where: { id: user.uuid },
    }
  );

  if (!savedToken) res.status(500).json("Error accesing database");
  else res.status(200).json("Logged out correctly");
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};

exports.info = (req, res, next) => {
  res.send("ALl good INFO");
};

const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  const refreshToken = user.getRefreshToken();

  const savedToken = await Token.update(
    {
      token: refreshToken,
      uuid: user.uuid,
    },
    {
      where: { id: user.uuid },
    }
  );

  if (!savedToken) res.status(500).json("Error accessing database");
  else {
    res
      .status(statusCode)
      .json({ token, refreshToken, username: user.username });
  }
};

const createToken = (user) => {
  const token = user.getSignedToken();
  const refreshToken = user.getRefreshToken();

  return { token, refreshToken };
};

const validateUserInfo = (body) => {
  keys = ["name", "lastname", "username", "email", "password"];

  for (k in keys) {
    if (body[keys[k]] == null) return false;
    if (body[keys[k]].length == 0) return false;
  }
  return true;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
