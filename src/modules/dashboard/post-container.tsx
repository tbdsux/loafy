import { Posts } from '@prisma/client';
import { LinkButton } from '../../components/LinkButton';
import { UserProps } from '../../lib/user';

interface PostContainerProps {
  post: Posts;
  user?: UserProps;
}

const PostContainer = ({ post, user }: PostContainerProps) => {
  return (
    <li className="my-2 relative border rounded-lg p-6">
      {user != null && user.id == post.authorId ? (
        <div className="absolute top-2 right-2">
          <LinkButton
            href={`/dashboard/posts/edit/${post.id}`}
            className="bg-mediumOrchid opacity-80 hover:opacity-100 duration-300 text-white py-1 px-3 rounded-lg text-xs"
          >
            edit
          </LinkButton>
        </div>
      ) : (
        <></>
      )}

      <h4 className="text-3xl font-extrabold leading-loose text-spaceCadet opacity-90">
        {post.title}
      </h4>
      <p className="line-clamp-2">{post.synopsis}</p>
      <div className="mt-2 flex items-center justify-between">
        <LinkButton
          href={`/p/${post.slug}`}
          className="bg-iris opacity-80 hover:opacity-100 duration-300 text-white py-2 px-8 rounded-lg text-sm"
        >
          read
        </LinkButton>

        <small className="">{new Date(post.createdAt).toString()}</small>
      </div>
    </li>
  );
};

export default PostContainer;
