import { AuthorizationError, resolver } from "blitz"
import { getSession } from "next-auth/client"

export const ensureAuthenticated = resolver.pipe(
  resolver.authorize(),
  async (_: any, { session }: { session: ReturnType<typeof getSession> }) => {
    if (!session.userId) {
      throw new AuthorizationError()
    }
  }
)

export const ensureAdmin = resolver.pipe(
  ensureAuthenticated,
  async (_: any, { session }: { session: ReturnType<typeof getSession> }) => {
    if (session.role !== "admin") {
      throw new AuthorizationError()
    }
  }
)