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

const fetchPostBySlug = async (slug: string) => {
  const post = await prisma.posts.findUnique({
    where: {
      slug
    },
    include: {
      author: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });

  return post
};

const fetchAllPosts = async () => {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};
export { createPost, fetchPosts, fetchAllPosts, fetchPostBySlug };
export type { PostProps };

