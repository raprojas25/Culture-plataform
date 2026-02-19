import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

export class AuthService {
  static async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const existingUsername = await User.findByUsername(userData.username);
    if (existingUsername) {
      throw new Error('El nombre de usuario ya existe');
    }

    const passwordHash = await hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password_hash: passwordHash
    });

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async login(email, password, ip, userAgent) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.is_active) {
      throw new Error('Cuenta desactivada');
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Actualizar último login
    await User.updateLastLogin(user.id, ip, userAgent);

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password_hash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }

  static async refreshToken(userId) {
    const user = await User.findById(userId);
    if (!user || !user.is_active) {
      throw new Error('Usuario no encontrado o inactivo');
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }
}
