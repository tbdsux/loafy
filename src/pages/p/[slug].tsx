import { Posts } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import urlJoin from 'url-join';
import PostsPage from '../../modules/posts/postspage';
import { ApiResponse } from '../../typings/api';

export async function getServerSideProps({ query, res }: GetServerSidePropsContext) {
  const { slug } = query;

  const r = await fetch(urlJoin(process.env.API_URL ?? '', `/posts/${slug}`));
  const data: ApiResponse<
    Posts & {
      author: {
        username: string;
        email: string;
      };
    }
  > = await r.json();

  return {
    props: {
      data
    }
  };
}

export default PostsPage;
