import { object, string } from "zod";


const userSchema = object({
    user: string({
        required_error: "Missing user"
    }),
    password: string({
        required_error: "Missing password"
    }),
    email: string({
        required_error: "Missing email"
    })
})

export function validateUser(user){
    return userSchema.safeParse(user)
}