import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const Signup = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(10).max(100),
  })

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ name, email, password }) => {
    const user = await db.user.create({
      data: { name, email, hashedPassword: password },
    })

    return user
  }
)