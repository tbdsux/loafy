import { Posts } from '@prisma/client';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr';
import DefaultLayout from '../../layouts/Default';
import fetcher from '../../lib/fetcher';
import { ApiResponse } from '../../typings/api';

import { NextPage } from 'next';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import Seo from '../../components/Seo';

interface PostsPageProps {
  data: ApiResponse<
    Posts & {
      author: {
        username: string;
        email: string;
      };
    }
  >;
}

const PostsPage: NextPage<PostsPageProps> = ({ data: defaultData }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useSWR<
    ApiResponse<
      Posts & {
        author: {
          username: string;
          email: string;
        };
      }
    >
  >(slug ? `/api/posts/${slug}` : null, fetcher, {
    fallbackData: defaultData
  });

  if (!data || !data.data)
    return (
      <DefaultLayout>
        <div className="mx-auto my-12 w-5/6">
          <p>loading...</p>
        </div>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <Seo title={data.data.title} description={data.data.synopsis} />

      <div className="w-4/5 mx-auto my-16">
        <div>
          <h2 className="text-5xl text-spaceCadet font-black">{data.data.title}</h2>

          <p className="text-sm my-2 text-gray-600">
            by{' '}
            <span className="underline">
              {data.data.author.username} ({data.data.author.email})
            </span>{' '}
            | {new Date(data.data?.createdAt ?? '').toString()}
          </p>

          <p className="mt-2 text-gray-800">{data.data.synopsis}</p>
        </div>

        <hr className="my-2" />

        <article className="mt-12 mx-auto w-11/12">
          <ReactMarkdown
            className="prose xl:prose-lg max-w-none"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {data.data?.content ?? ''}
          </ReactMarkdown>
        </article>
      </div>
    </DefaultLayout>
  );
};

export default PostsPage;
