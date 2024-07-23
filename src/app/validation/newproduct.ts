// newproduct.ts
import { z } from 'zod';

export const formSchema = z.object({
  Title: z.string().min(1, 'Title is required'),
  Price: z.string().min(1, 'Price is required'),
  SellingPrice: z.string().min(1, 'Selling  is required'),
  DealerPrice: z.string().min(1, 'Dealer Price  is required'),
  Description:z.string().min(1,'Description  is required'),

});

export type FormSchemaType = z.infer<typeof formSchema>;
