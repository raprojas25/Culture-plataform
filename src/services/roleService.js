import api from '../api/apiClient';

export const roleService = {
  getAll: async () => {
    const response = await api.get('/roles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },

  create: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },

  update: async (id, roleData) => {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/roles/${id}`);
  },

  getPermissions: async (id) => {
    const response = await api.get(`/roles/${id}/permissions`);
    return response.data.permissions;
  },

  getDefaultRoles: async () => {
    const response = await api.get('/roles/default');
    return response.data;
  },

  getAvailablePermissions: async () => {
    // Esta es una lista estática de permisos disponibles
    // En un sistema más complejo, esto vendría de la base de datos
    return [
      { code: 'users:read', name: 'Leer usuarios', description: 'Permite ver la lista de usuarios' },
      { code: 'users:write', name: 'Escribir usuarios', description: 'Permite crear, editar y eliminar usuarios' },
      { code: 'events:read', name: 'Leer eventos', description: 'Permite ver eventos' },
      { code: 'events:write', name: 'Escribir eventos', description: 'Permite crear, editar y eliminar eventos' },
      { code: 'events:moderate', name: 'Moderar eventos', description: 'Permite aprobar/rechazar eventos' },
      { code: 'categories:read', name: 'Leer categorías', description: 'Permite ver categorías' },
      { code: 'categories:write', name: 'Escribir categorías', description: 'Permite crear, editar y eliminar categorías' },
      { code: 'districts:read', name: 'Leer distritos', description: 'Permite ver distritos' },
      { code: 'districts:write', name: 'Escribir distritos', description: 'Permite crear, editar y eliminar distritos' },
      { code: 'roles:read', name: 'Leer roles', description: 'Permite ver roles' },
      { code: 'roles:write', name: 'Escribir roles', description: 'Permite crear, editar y eliminar roles' },
      { code: 'statistics:read', name: 'Leer estadísticas', description: 'Permite ver estadísticas del sistema' },
      { code: 'settings:read', name: 'Leer configuraciones', description: 'Permite ver configuraciones del sistema' },
      { code: 'settings:write', name: 'Escribir configuraciones', description: 'Permite modificar configuraciones del sistema' },
    ];
  },
};

