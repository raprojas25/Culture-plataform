/*
export const authMiddleware = (req, res, next) => {
  next();
};
*/
/*
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = decoded; // 🔥 disponible en controllers
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
*/
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token requerido' });

  const token = header.split(' ')[1];

  try {
    req.user = jwt.verify(token, jwtConfig.secret);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};
