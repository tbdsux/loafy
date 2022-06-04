import bcrypt from 'bcryptjs';

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password);
};

const validatePassword = (password: string, validatePassword: string): boolean => {
  return bcrypt.compareSync(password, validatePassword);
};

export { validatePassword, hashPassword };
