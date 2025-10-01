import { t } from 'elysia'

export const createTokenSchema = t.Object({
  token: t.String(),
  user_id: t.String(),
  expires_at: t.Date()
});

export const verifyTokenSchema = t.Object({
  token: t.String()
});

export const userIdSchema = t.Object({
  user_id: t.String()
});

export type CreateToken = typeof createTokenSchema;
export type VerifyToken = typeof verifyTokenSchema;
export type UserId = typeof userIdSchema;
