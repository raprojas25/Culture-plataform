/*
import * as authService from './auth.service.js';

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
*/
import * as authService from './auth.service.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Registrar usuarios
//
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.register({
      username,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

//nuevos metodos refreshToken

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const token = await authService.refresh(refreshToken);
    res.json(token);
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
