// const router = require("express").Router();
import Router from "express";
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

// sign up

//UPDATE
export const update = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deletet = async (req, res) => {
  // if (req.body.userId === req.params.id) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted...");
  } catch (err) {
    return res.status(404).json("error");
  }
};

// GET USER
export const findone = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      users: user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// getall================================

export const findAll = (req, res) => {
  User.find()
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

export default router;
