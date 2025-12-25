import * as userService from './user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    res.json(await userService.getUsers());
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    res.json(await userService.getUserById(req.params.id));
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    res.json(await userService.updateUser(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
};

export const deactivateUser = async (req, res, next) => {
  try {
    await userService.deactivateUser(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
