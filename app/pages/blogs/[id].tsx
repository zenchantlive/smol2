```tsx
import { Suspense } from "react"
import { useRouter, BlitzPage, useQuery, useParam, NotFoundError } from "blitz"
import getBlog from "app/blogs/api/blogs"
import Layout from "app/core/layouts/Layout"
import Blog from "app/blogs/components/Blog"

const BlogPage: BlitzPage = () => {
  const router = useRouter()
  const blogId = useParam("id", "number")
  const [blog] = useQuery(getBlog, { id: blogId })

  if (!blog) throw new NotFoundError()

  return (
    <div className="container mx-auto px-4">
      <Blog blog={blog} />
    </div>
  )
}

const ShowBlogPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPage />
      </Suspense>
    </div>
  )
}

ShowBlogPage.authenticate = true
ShowBlogPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBlogPage
```