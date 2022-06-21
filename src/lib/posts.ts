import { prisma } from './prisma';
import { UserProps } from './user';
import { postsPerPage } from './utils';

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
const fetchAllPosts = async (page: number) => {
  if (page <= 0) page = 1;

  let skip = (page - 1) * postsPerPage;

  return await prisma.posts.findMany({
    skip,
    take: postsPerPage,

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

const deletePostById = async (id: number) => {
  return await prisma.posts.delete({
    where: {
      id
    }
  });
};

export {
  createPost,
  fetchPosts,
  fetchAllPosts,
  fetchPostBySlug,
  fetchPostById,
  updatePostById,
  deletePostById
};
export type { PostProps };
