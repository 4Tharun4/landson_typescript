import * as z from 'zod';

export const verifyotp = z.object({
  Code: z.string().min(6, 'Verification code must be at least 6 characters long')
});
