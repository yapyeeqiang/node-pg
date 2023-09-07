import { compare, genSalt, hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(SALT_ROUNDS);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};
