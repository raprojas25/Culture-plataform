import express from "express";
import { UserController } from "../controllers/userController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
  validateUser,
  validateUpdateUser,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Solo admin puede ver todos los usuarios
router.get("/", authorizeRoles(1), UserController.getAllUsers);

// Usuario puede ver su propio perfil, admin puede ver cualquier perfil
router.get("/:id", (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role_id === 1) {
    return UserController.getUserById(req, res, next);
  }
  res.status(403).json({ error: "No tienes permisos para ver este usuario" });
});

// Solo admin puede crear usuarios (o permitir registro público si se desea)
router.post("/", authorizeRoles(1), validateUser, UserController.createUser);

// Usuario puede actualizar su propio perfil, admin puede actualizar cualquier perfil
router.put("/:id", validateUpdateUser, (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role_id === 1) {
    return UserController.updateUser(req, res, next);
  }
  res
    .status(403)
    .json({ error: "No tienes permisos para actualizar este usuario" });
});

// Cambiar contraseña
router.put("/:id/password", UserController.updatePassword);

// Solo admin puede desactivar/eliminar usuarios
router.put("/:id/deactivate", authorizeRoles(1), UserController.deactivateUser);
router.delete("/:id", authorizeRoles(1), UserController.deleteUser);

export default router;
