const { UUIDV4, UUID } = require("sequelize");
const uuid = require("uuid");
const { Group, User } = require("../models");

exports.create = async (req, res, next) => {
  const { name, description } = req.body;
  let group = null;

  const user = req.user;

  try {
    group = await Group.create({
      name,
      description,
      owner: user.uuid,
    });

    await group.addUser(user);
    await user.addGroup(group);

    const result = await Group.findOne({
      where: { id: group.id },
      include: User,
    });

    return res.status(201).json({ group: result });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;

  try {
    const group = await Group.findOne({ where: { id }, include: User });

    return res.status(200).json(group);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.add_user = async (req, res, next) => {
  const { id } = req.params;
  const users = req.body;

  try {
    const group = await Group.findOne({ where: { id } });

    const arr_users = [];

    users.forEach((user) => {
      arr_users.push(addUser(group, user));
    });

    await Promise.all(arr_users);

    const group_updated = await Group.findOne({
      where: { id },
      include: User,
    });

    return res.status(200).json(group_updated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove_user = async (req, res, nest) => {
  const { id } = req.params;
  const users = req.body;

  try {
    const group = await Group.findOne({ where: { id } });

    const arr_users = [];

    users.forEach((user) => {
      arr_users.push(delUser(group, user));
    });

    await Promise.all(arr_users);

    const group_updated = await Group.findOne({
      where: { id },
      include: User,
    });

    return res.status(200).json(group_updated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addUser = async (group, username) => {
  try {
    const user = await User.findOne({ where: { username } });
    await group.addUser(user);
    await user.addGroup(group);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const delUser = async (group, username) => {
  try {
    const user = await User.findOne({ where: { username } });
    await group.removeUser(user);
    await user.removeGroup(group);
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.update = async (req, res, nest) => {
  const { name, description } = req.body;
  const { id } = req.params;
  let group = null;

  try {
    group = await Group.findOne({
      where: {
        id,
      },
    });

    if (group == null)
      return res.status(404).json({ error: "Group not found" });

    group.update({ name, description });

    return res.status(200).json({ group });
  } catch (error) {
    return res.status(500).json(error);
  }
};
