import { Role } from '../models/Role.js';

export class RoleController {
  static async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      
      // Obtener conteo de usuarios para cada rol
      const rolesWithCounts = await Promise.all(
        roles.map(async (role) => {
          const usersCount = await Role.getUsersCount(role.id);
          const permissions = await Role.getPermissions(role.id);
          return { ...role, users_count: usersCount, permissions };
        })
      );

      res.json(rolesWithCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const usersCount = await Role.getUsersCount(role.id);
      const permissions = await Role.getPermissions(role.id);
      
      res.json({ ...role, users_count: usersCount, permissions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createRole(req, res) {
    try {
      // Verificar si ya existe un rol con el mismo nombre
      const existingRole = await Role.findByName(req.body.name);
      if (existingRole) {
        return res.status(400).json({ error: 'Ya existe un rol con este nombre' });
      }

      const role = await Role.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ error: 'El nombre del rol ya existe' });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      // Verificar si el rol existe
      const existingRole = await Role.findById(req.params.id);
      if (!existingRole) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      // Verificar si el nuevo nombre ya existe (si se está cambiando)
      if (req.body.name && req.body.name !== existingRole.name) {
        const roleWithSameName = await Role.findByName(req.body.name);
        if (roleWithSameName && roleWithSameName.id !== parseInt(req.params.id)) {
          return res.status(400).json({ error: 'Ya existe un rol con este nombre' });
        }
      }

      // No permitir modificar los roles del sistema (admin, user, etc.)
      const systemRoles = ['admin', 'user', 'organizer', 'moderator'];
      if (systemRoles.includes(existingRole.name.toLowerCase())) {
        return res.status(400).json({ 
          error: 'No se puede modificar un rol del sistema' 
        });
      }

      const role = await Role.update(req.params.id, req.body);
      res.json(role);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'El nombre del rol ya existe' });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      // Verificar si el rol existe
      const existingRole = await Role.findById(req.params.id);
      if (!existingRole) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      // No permitir eliminar los roles del sistema
      const systemRoles = ['admin', 'user', 'organizer', 'moderator'];
      if (systemRoles.includes(existingRole.name.toLowerCase())) {
        return res.status(400).json({ 
          error: 'No se puede eliminar un rol del sistema' 
        });
      }

      // Verificar que no hay usuarios asociados
      const usersCount = await Role.getUsersCount(req.params.id);
      if (usersCount > 0) {
        return res.status(400).json({ 
          error: 'No se puede eliminar el rol porque tiene usuarios asociados' 
        });
      }

      const role = await Role.delete(req.params.id);
      res.json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRolePermissions(req, res) {
    try {
      const permissions = await Role.getPermissions(req.params.id);
      res.json({ permissions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDefaultRoles(req, res) {
    try {
      const defaultRoles = [
        {
          id: 1,
          name: 'admin',
          description: 'Administrador del sistema con acceso completo',
          permissions: ['full_access'],
          is_system: true
        },
        {
          id: 2,
          name: 'organizer',
          description: 'Organizador de eventos',
          permissions: ['events:read', 'events:write', 'categories:read'],
          is_system: true
        },
        {
          id: 3,
          name: 'user',
          description: 'Usuario regular',
          permissions: ['events:read', 'events:like'],
          is_system: true
        },
        {
          id: 4,
          name: 'moderator',
          description: 'Moderador de contenido',
          permissions: ['events:read', 'events:moderate', 'users:read'],
          is_system: true
        }
      ];
      
      res.json(defaultRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

