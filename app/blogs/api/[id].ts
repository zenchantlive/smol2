import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBlog = z.object({
  // This accepts type of any
  id: z.any(),
})

export default async function getBlog({ id }: z.infer<typeof GetBlog>) {
  // Ensure you have a valid id
  if (!id) throw new NotFoundError()

  const blog = await db.blog.findFirst({
    where: { id },
  })

  if (!blog) throw new NotFoundError()

  return blog
}