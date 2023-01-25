const express = require("express");
const router = express.Router();

const {
  create,
  read,
  add_user,
  remove_user,
  update,
} = require("../controllers/group");

router.route("/create").post(create);

router.route("/read/:id").get(read);

router.route("/add/:id").put(add_user);

router.route("/remove/:id").put(remove_user);

router.route("/update/:id").put(update);

module.exports = router;
