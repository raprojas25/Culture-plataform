
/*
export const jwtConfig = {
  expiresIn: '1d',
};
*/

/*
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1d',
};
*/

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  accessExpiresIn: '15m',
  refreshExpiresIn: '30d',
};
