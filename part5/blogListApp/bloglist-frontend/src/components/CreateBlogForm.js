const CreateBlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.addNewBlog}>
        <div>
          title:
          <input
            type='text'
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type='text'
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type='text'
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
          ></input>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
