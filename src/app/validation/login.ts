import {z} from 'zod'

const EmailSchemaValidaton = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter a Vaid Emai Address")

export const Registration = z.object({
    Email : EmailSchemaValidaton,
    Password:  z.string().min(6,{message:"Password must be 6 charcters"}),
    UserId: z.string().max(3,{message:"UserId Contains on 3 Character"})
})