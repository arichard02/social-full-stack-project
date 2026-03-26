
function Post({ post }) {

    const date = new Date(post.createdAt)

    return (
        <div>
            <h3>{post.title}</h3>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{post.body}</p>
        </div>
    )
}

export default Post
