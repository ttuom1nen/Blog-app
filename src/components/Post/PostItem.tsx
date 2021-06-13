import CustomButton from "../CustomButton/CustomButton";
import { Post } from "../../API";
import { BlogPost, UserName, PostFooter } from "./PostItem.styles";

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const handlePostDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Delete clicked!");
  };

  const handlePostEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Edit clicked!");
  };

  return (
    <BlogPost key={post.id}>
      <h3>{post.postTitle}</h3>
      <p>{post.postBody}</p>
      <UserName>
        {post.postOwnerUsername}
        <time>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : null}
        </time>
      </UserName>
      <PostFooter>
        <CustomButton role="primary" onClick={handlePostDelete}>
          Delete
        </CustomButton>
        <CustomButton role="primary" onClick={handlePostEdit}>
          Edit
        </CustomButton>
      </PostFooter>
    </BlogPost>
  );
};

export default PostItem;
