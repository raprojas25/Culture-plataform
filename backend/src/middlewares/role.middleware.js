/*
export const roleMiddleware = (role) => (req, res, next) => {
  next();
};
*/
export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({
        message: 'Usuario no autenticado',
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'No tienes permisos para esta acción',
      });
    }

    next();
  };
};
