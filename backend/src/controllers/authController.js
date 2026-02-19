import { AuthService } from '../services/authService.js';

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const ip = req.ip;
      const userAgent = req.get('User-Agent');

      const result = await AuthService.login(email, password, ip, userAgent);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async refreshToken(req, res) {
    try {
      const result = await AuthService.refreshToken(req.user.id);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      // req.user está establecido por el middleware de autenticación
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const { password_hash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
