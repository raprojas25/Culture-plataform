import { User } from "../models/User.js";
import { AuthService } from "../services/authService.js";
import { hashPassword } from "../utils/bcrypt.js";

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await User.findAll(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.params.id;

      // Verificar si el usuario actual puede cambiar esta contraseña
      if (req.user.id !== userId && req.user.role_id !== 1) {
        return res
          .status(403)
          .json({ error: "No tienes permisos para cambiar esta contraseña" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Si no es admin, verificar contraseña actual
      if (req.user.role_id !== 1) {
        const isValid = await comparePassword(
          currentPassword,
          user.password_hash,
        );
        if (!isValid) {
          return res
            .status(400)
            .json({ error: "Contraseña actual incorrecta" });
        }
      }

      const newPasswordHash = await hashPassword(newPassword);
      await User.updatePassword(userId, newPasswordHash);

      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deactivateUser(req, res) {
    try {
      const user = await User.deactivate(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario desactivado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
