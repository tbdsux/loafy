import { Posts } from '@prisma/client';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import fetcher, { requester } from '../../../lib/fetcher';
import { useUser } from '../../../lib/hooks/useUser';
import { PostProps } from '../../../lib/posts';
import { ApiResponse } from '../../../typings/api';
import PostEditor from '../post/editor';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();

  const { data } = useSWR<
    ApiResponse<
      Posts & {
        author: {
          username: string;
          email: string;
        };
      }
    >
  >(`/api/posts/id/${id}`, fetcher);

  if (!data) {
    return (
      <DefaultLayout>
        <p>loading...</p>
      </DefaultLayout>
    );
  }

  if (!data.success) {
    return (
      <DefaultLayout>
        <Seo title="Post not found" />

        <Error statusCode={404} />
      </DefaultLayout>
    );
  }

  if (data.data?.author.email !== user?.email) {
    return (
      <DefaultLayout>
        <Seo title="Forbidden" />

        <Error statusCode={403} />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Seo title="Edit Post" />

      <PostEditor
        handler={{
          text: 'edit post',
          function: async (post: PostProps) => {
            const r = await requester(`/api/dashboard/posts/edit/${id}`, post);

            const data: ApiResponse = await r.json();

            if (!r.ok) {
              toast.error('There was a problem trying to update the post.');
              return;
            }

            toast.success('Successfully updated the post.');

            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          }
        }}
        post={data.data}
      />
    </DefaultLayout>
  );
};

export default EditPostPage;
