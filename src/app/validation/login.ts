import {z} from 'zod'

const EmailSchemaValidaton = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter a Valid Emai Address")

export const Login = z.object({
    Identifier:z.string(),
    Password:  z.string().min(6,{message:"Password must be 6 charcters"}),
   
})