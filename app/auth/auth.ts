import { SessionContext } from "blitz"
import db, { User } from "db"

export async function getCurrentUser(
  session: SessionContext["session"]
): Promise<User | null> {
  if (session.userId) {
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: { id: true, name: true, email: true, role: true },
    })

    return user
  } else {
    return null
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findFirst({ where: { email } })
  if (!user || !(await user.checkPassword(password))) {
    return null
  }

  return user
}