import { BlitzPage, useMutation, useRouter } from "blitz";
import { useState } from "react";
import createBlog from "app/blogs/api/blogs";
import BlogForm from "app/blogs/components/BlogForm";
import Layout from "app/core/layouts/Layout";
import { FORM_ERROR } from "final-form";

const NewBlogPage: BlitzPage = () => {
  const router = useRouter();
  const [createBlogMutation] = useMutation(createBlog);
  const [error, setError] = useState(null);

  async function onSubmit(values) {
    try {
      const blog = await createBlogMutation(values);
      router.push(`/blogs/${blog.id}`);
    } catch (error) {
      setError({ [FORM_ERROR]: error.toString() });
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Create New Blog</h1>
      <BlogForm onSubmit={onSubmit} error={error} />
      <button id="save-blog-button" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" type="submit">Save Blog</button>
    </div>
  );
};

NewBlogPage.authenticate = true;
NewBlogPage.getLayout = (page) => <Layout title="Create New Blog">{page}</Layout>;

export default NewBlogPage;