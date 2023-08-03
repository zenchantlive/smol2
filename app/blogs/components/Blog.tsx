import React from 'react'
import { Link, useRouter, useMutation, BlitzPage } from 'blitz'
import deleteBlog from 'app/blogs/mutations/deleteBlog'
import getBlog from 'app/blogs/queries/getBlog'

export const Blog = ({ blog }) => {
  const router = useRouter()
  const [deleteBlogMutation] = useMutation(deleteBlog)

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Link href="/blogs/[id]/edit" as={`/blogs/${blog.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteBlogMutation({ id: blog.id })
            router.push("/blogs")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowBlogPage: BlitzPage = () => {
  const router = useRouter()
  const blogId = Number(router?.query.id)

  const [blog] = useQuery(getBlog, { id: blogId })

  return (
    <div>
      <p>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
      </p>

      <Blog blog={blog} />

    </div>
  )
}

export default ShowBlogPage