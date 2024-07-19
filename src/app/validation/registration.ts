import {z} from 'zod'

const EmailSchemaValidaton = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter a Vaid Emai Address");


export const Registrations = z.object({
    Email : EmailSchemaValidaton,
    UserName: z.string(),
    Password:  z.string().min(6,{message:"Password must be 6 charcters"}),
   Address : z.string(),
   PhoneNumber: z.string().refine((val) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(val);
  }, { message: "Invalid phone number format" }),
})