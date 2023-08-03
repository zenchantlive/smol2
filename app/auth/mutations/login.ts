import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Login } from "app/auth/validations"

export default resolver.pipe(
  resolver.zod(Login),
  async ({ email, password }, ctx) => {
    const user = await db.user.findFirst({ where: { email } })
    if (!user || !user.hashedPassword) {
      throw new Error("The email or password you entered is incorrect.")
    }

    const passwordValid = await SecurePassword.verify(user.hashedPassword, password)
    if (passwordValid !== SecurePassword.VALID) {
      throw new Error("The email or password you entered is incorrect.")
    }

    await ctx.session.$create({ userId: user.id, roles: user.roles })
    return user
  }
)