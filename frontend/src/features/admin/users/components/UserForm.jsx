import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Label } from "@/shared/components/ui/Label";
import Select from "@/shared/components/ui/Select";
import { Eye, EyeOff, Loader2, User, Mail, Lock, Shield } from "lucide-react";

/**
 * @typedef {'admin' | 'moderator' | 'organizer' | 'user'} UserRole
 */

/**
 * @typedef {Object} UserFormData
 * @property {string} username - Nombre de usuario
 * @property {string} email - Correo electrónico
 * @property {string} [password] - Contraseña (solo requerida al crear)
 * @property {UserRole} role_id - Rol del usuario
 * @property {boolean} [is_active] - Estado del usuario
 */

/**
 * @typedef {Object} UserFormProps
 * @property {UserFormData} [user] - Datos del usuario para editar (undefined si es creación)
 * @property {(data: UserFormData) => Promise<{success: boolean, error?: string}>} onSubmit - Callback al enviar formulario
 * @property {() => void} onCancel - Callback al cancelar
 * @property {'create' | 'edit'} [mode='create'] - Modo del formulario
 * @property {boolean} [loading] - Estado de carga
 */

/**
 * Formulario para crear o editar usuarios con validación
 *
 * @param {UserFormProps} props
 * @returns {JSX.Element}
 */
export const UserForm = ({
  user,
  onSubmit,
  onCancel,
  mode = "create",
  loading = false,
}) => {
  const isEdit = mode === "edit";
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Estado del formulario
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    role_id: user?.role_id || 4, // Por defecto 'user'
    is_active: user?.is_active ?? true,
  });

  // Actualizar formulario si cambian los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        role_id: user.role_id || 4,
        is_active: user.is_active ?? true,
      });
    }
  }, [user]);

  /**
   * Opciones de roles
   */
  const roleOptions = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Organizador" },
    { value: 3, label: "Moderador" },
    { value: 4, label: "Usuario" },
  ];

  /**
   * Valida los campos del formulario
   *
   * @returns {boolean} - Si es válido
   */
  const validate = () => {
    const newErrors = {};

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "El nombre es requerido";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "El nombre debe tener al menos 3 caracteres";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    // Password (solo en creación o si se está cambiando)
    if (!isEdit || formData.password) {
      if (!formData.password) {
        newErrors.password = "La contraseña es requerida";
      } else if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   *
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      role_id: formData.role_id,
      is_active: formData.is_active,
    };

    // Solo incluir contraseña si se proporcionó
    if (formData.password) {
      data.password = formData.password;
    }

    const result = await onSubmit(data);

    if (!result.success && result.error) {
      setErrors({ submit: result.error });
    }
  };

  /**
   * Actualiza un campo del formulario
   *
   * @param {string} field
   * @param {string | number | boolean} value
   */
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Error general */}
      {errors.submit && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.submit}
          </p>
        </div>
      )}

      {/* Campos del formulario */}
      <div className="space-y-4">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nombre de usuario
          </Label>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => updateField("username", e.target.value)}
            placeholder="Ej: Juan Pérez"
            error={errors.username}
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="ejemplo@correo.com"
            error={errors.email}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password (siempre visible, opcional en edición) */}
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Contraseña {isEdit && <span className="text-gray-400 text-xs">(dejar vacío para no cambiar)</span>}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder={isEdit ? "••••••••" : "Mínimo 6 caracteres"}
              error={errors.password}
              autoComplete={isEdit ? "new-password" : "current-password"}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirmar Password (solo si hay password) */}
        {formData.password && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirmar contraseña
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Repite la contraseña"
                error={errors.confirmPassword}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Rol */}
        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Rol del usuario
          </Label>
          <Select
            options={roleOptions}
            value={formData.role_id}
            onChange={(value) => updateField("role_id", value)}
            placeholder="Seleccionar rol"
          />
        </div>

        {/* Estado (solo en edición) */}
        {isEdit && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => updateField("is_active", e.target.checked)}
              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Usuario {formData.is_active ? "activo" : "inactivo"}
            </Label>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Guardando...</span>
            </>
          ) : isEdit ? (
            "Actualizar Usuario"
          ) : (
            "Crear Usuario"
          )}
        </Button>
      </div>
    </form>
  );
};
