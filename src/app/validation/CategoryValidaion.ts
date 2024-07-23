// newproduct.ts
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Title is required'),
  
  imageUrls: z.array(z.string()).optional(), 

});

export type FormSchemaType = z.infer<typeof formSchema>;
