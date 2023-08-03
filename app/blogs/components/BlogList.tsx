import React from 'react'
import { usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz'
import getBlogs from 'app/blogs/api/blogs'
import { Link, Button } from '@chakra-ui/react'
import Blog from './Blog'

const ITEMS_PER_PAGE = 10

export const BlogList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blogs, hasMore }] = usePaginatedQuery(getBlogs, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button as={Link} href={Routes.NewBlogPage()} colorScheme="teal">
          Create New Blog
        </Button>
      </div>

      <div className="mt-6">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default BlogList