import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateBlog = z
  .object({
    title: z.string(),
    content: z.string(),
  })

export default resolver.pipe(
  resolver.zod(CreateBlog),
  resolver.authorize(),
  async (input) => {
    const blog = await db.blog.create({ data: input })

    return blog
  }
)