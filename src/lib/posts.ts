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
  const posts = await prisma.posts.findMany({
    where: {
      authorId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return posts;
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

  return post;
};

const fetchPostById = async (id: number) => {
  const post = await prisma.posts.findUnique({
    where: {
      id
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

  return post;
};

const fetchAllPosts = async () => {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

const updatePostById = async (id: number, post: PostProps) => {
  return await prisma.posts.update({
    where: {
      id
    },
    data: {
      ...post
    }
  });
};

export { createPost, fetchPosts, fetchAllPosts, fetchPostBySlug, fetchPostById, updatePostById };
export type { PostProps };
