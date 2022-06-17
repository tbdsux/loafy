import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import { requester } from '../../../lib/fetcher';
import { PostProps } from '../../../lib/posts';
import { ApiResponse } from '../../../typings/api';
import PostEditor from '../post/editor';

const CreateNewPostPage = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <Seo title="Create a New Post" />

      <PostEditor
        handler={{
          text: 'create post',
          function: async (post: PostProps) => {
            const r = await requester('/api/dashboard/new-post', post);

            const data: ApiResponse = await r.json();

            if (!r.ok) {
              toast.error('There was a problem trying to create the post.');
              return;
            }

            toast.success('Successfully created a new post.');

            // redirect after 2secs
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          }
        }}
      />
    </DefaultLayout>
  );
};

export default CreateNewPostPage;
