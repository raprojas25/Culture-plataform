/*
import * as userModel from './user.model.js';

export const getUsers = async () => {
  return userModel.findAll();
};
*/
import * as userModel from './user.model.js';
import { findRoleByName } from '../roles/role.model.js';
import { hashPassword } from '../../utils/hash.js';
export const getUsers = () => userModel.findAll();

export const getUserById = async (id) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

export const createUser = async ({ username, email, password, role }) => {
  const roleData = await findRoleByName(role);
  if (!roleData) throw new Error('Rol inválido');

  const passwordHash = await hashPassword(password);

  return userModel.createUserAdmin({
    username,
    email,
    passwordHash,
    roleId: roleData.id,
  });
};

export const updateUser = async (id, data) => {
  const roleData = await findRoleByName(data.role);
  if (!roleData) throw new Error('Rol inválido');

  return userModel.updateUser(id, {
    username: data.username,
    email: data.email,
    roleId: roleData.id,
  });
};

export const deactivateUser = async (id) => {
  await userModel.deactivateUser(id);
};


