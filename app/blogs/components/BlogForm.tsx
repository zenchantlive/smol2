```tsx
import { Form, Field } from "react-final-form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Button } from "app/core/components/Button";
import { useMutation } from "blitz";
import createBlog from "app/blogs/api/blogs";

const BlogForm = () => {
  const [createBlogMutation] = useMutation(createBlog);

  const onSubmit = async (values) => {
    try {
      const blog = await createBlogMutation(values);
      alert("Success!" + JSON.stringify(blog));
    } catch (error) {
      alert("Error creating blog " + JSON.stringify(error, null, 2));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={LabeledTextField}
            label="Title"
            placeholder="Title"
          />
          <Field
            name="content"
            component={LabeledTextField}
            label="Content"
            placeholder="Content"
          />
          <Button id="save-blog-button" type="submit">
            Save Blog
          </Button>
        </form>
      )}
    />
  );
};

export default BlogForm;
```