import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  // This accepts type of any
  id: z.any(),
})

export default async function getUser({ id }: z.infer<typeof GetUser>) {
  // Ensure you have a valid user id
  if (!id) throw new NotFoundError()

  const user = await db.user.findFirst({
    where: { id },
  })

  if (!user) throw new NotFoundError()

  return user
}