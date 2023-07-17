import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Must be a valid email'});
const passwordSchema = z.string().min(8, { message: 'Must be 8 characters'}).regex(/[a-z]/, { message: "Must contain a lowercase letter" }).regex(/[A-Z]/, { message: "Must contain an uppercase letter" });
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export {
  emailSchema,
  passwordSchema,
  loginSchema,
}
