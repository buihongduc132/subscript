import bcrypt from "bcryptjs";

const salt = 12;

export const hash = async (password: string) => await bcrypt.hash(password, salt);
export const comparePassword = async (password: string, hashedPassword: string) => await bcrypt.compare(password, hashedPassword);