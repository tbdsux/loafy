import { prisma } from './prisma';
import { UserProps } from './user';

interface PostProps {
  content: string;
  slug: string;
  synopsis: string;
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

const fetchPosts = async (user: UserProps) => {
  // TODO: sort thet posts in here
  const posts = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      posts: true
    }
  });

  return posts?.posts ?? [];
};

const fetchAllPosts = async () => {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};
export { createPost, fetchPosts, fetchAllPosts };
export type { PostProps };
