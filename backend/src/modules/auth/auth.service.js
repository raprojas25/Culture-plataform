/*
export const login = async ({ email, password }) => {
  return {
    message: 'Login OK (pendiente lógica)',
    email,
  };
};
*/
/*
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.js';

export const login = async ({ email, password }) => {
  //  aquí luego validas contra BD
  const user = {
    id: '123',
    role: 'admin',
  };

  const token = jwt.sign(user, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return {
    token,
    user,
  };
};
*/
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.js';
import { comparePassword, hashPassword } from '../../utils/hash.js';

import { findByEmail, createUser } from '../users/user.model.js';
import { findRoleByName } from '../roles/role.model.js';
import { updateLoginAudit } from '../users/user.model.js';

/*
export const login = async ({ email, password }) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const validPassword = await comparePassword(
    password,
    user.password_hash
  );

  if (!validPassword) {
    throw new Error('Credenciales inválidas');
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
*/

export const register = async ({ username, email, password }) => {
  const exists = await findByEmail(email);
  if (exists) {
    throw new Error('El email ya está registrado');
  }

  const role = await findRoleByName('user');
  if (!role) {
    throw new Error('Rol user no existe');
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    username,
    email,
    passwordHash,
    roleId: role.id,
  });

  return {
    message: 'Usuario creado correctamente',
    user,
  };
};


// import { jwtConfig } from '../../config/jwt.js';
// import { findByEmail } from '../users/user.model.js';
// import { comparePassword } from '../../utils/hash.js';
import {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} from './refresh.model.js';

const generateAccessToken = (payload) =>
  jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.accessExpiresIn,
  });

export const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw new Error('Credenciales inválidas');

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) throw new Error('Credenciales inválidas');

  const payload = { id: user.id, role: user.role };

  const accessToken = generateAccessToken(payload);

  const refreshToken = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await saveRefreshToken(user.id, refreshToken, expiresAt);
  
  await updateLoginAudit(
  user.id,
  req.ip,
  req.headers['user-agent']
);

  return { accessToken, refreshToken };
};

export const refresh = async (token) => {
  const stored = await findRefreshToken(token);
  if (!stored) throw new Error('Refresh token inválido');

  const payload = jwt.verify(token, jwtConfig.secret);

  return {
    accessToken: generateAccessToken({
      id: payload.id,
      role: payload.role,
    }),
  };
};

export const logout = async (token) => {
  await deleteRefreshToken(token);
};
