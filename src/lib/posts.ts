import { prisma } from './prisma';
import { UserProps } from './user';

interface PostProps {
  content: string;
  slug: string;
  title: string;
  published: boolean;
}

const createPost = async (post: PostProps, user: UserProps) => {
  return await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      posts: {
        create: {
          ...post
        }
      }
    }
  });
};

export { createPost };
export type { PostProps };
