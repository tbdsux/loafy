import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import { requester } from '../../../lib/fetcher';
import { PostProps } from '../../../lib/posts';
import { ApiResponse } from '../../../typings/api';

const CreateNewPostPage = () => {
  const router = useRouter();
  const [vd, setVd] = useState<Vditor>();

  const [slug, setSlug] = useState('');

  const titleInput = useRef<HTMLInputElement>(null);
  const slugInput = useRef<HTMLInputElement>(null);
  const synopsisInput = useRef<HTMLTextAreaElement>(null);
  const draftInput = useRef<HTMLInputElement>(null);

  const createPost = async () => {
    const value = vd?.getValue() ?? '';
    const title = titleInput.current?.value ?? '';
    const synopsis = synopsisInput.current?.value ?? '';
    const published = !draftInput.current?.checked;

    if (!value || !title) return; // no content and title

    const post: PostProps = {
      content: value,
      title,
      slug,
      synopsis,
      published
    };

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
  };

  useEffect(() => {
    const vditor = new Vditor('vditor', {
      height: '400px',
      tab: '\t',
      lang: 'en_US',
      preview: {
        markdown: {
          sanitize: true
        }
      },
      after: () => {
        vditor.setValue('# title for your content\nwrite something new again...');
        setVd(vditor);
      }
    });
  }, []);

  return (
    <DefaultLayout>
      <Seo title="Create a New Post" />

      <div className="w-5/6 mx-auto my-12">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <input
              onChange={(e) => {
                const value = e.currentTarget.value.trim();
                if (!value) return;
                if (value == slug) return;

                // FIXME: should debounce in here
                setSlug(value.trim().toLowerCase().replaceAll(' ', '-'));
              }}
              ref={titleInput}
              type="text"
              className="px-4 py-2 border-b-2 border-iris focus:outline-none focus:border-spaceCadet duration-300 w-full mr-4 font-bold text-gray-700"
              placeholder="Your content's amazing title..."
            />

            <button
              onClick={createPost}
              className="flex-none px-10 py-3 bg-spaceCadet opacity-80 hover:opacity-100 duration-300 text-white rounded-lg text-sm"
            >
              create post
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <input
                ref={slugInput}
                value={slug}
                readOnly
                type="text"
                className="mr-4 py-2 px-4 border-b border-iris focus:outline-none focus:border-spaceCadet duration-300 w-full text-sm my-2"
                placeholder="(your slug url)"
              />

              <div className="flex-none flex items-center">
                <input
                  ref={draftInput}
                  type="checkbox"
                  className="w-4 h-4 text-iris-600 bg-gray-100 rounded border-gray-300 focus:ring-iris-500 dark:focus:ring-iris-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="text-sm ml-1">set as draft</p>
              </div>
            </div>

            <textarea
              ref={synopsisInput}
              className="py-2 px-4 h-16 border-b border-iris focus:outline-none focus:border-spaceCadet duration-300 w-full"
              placeholder="a short synopsis of your blog content..."
            ></textarea>
          </div>
        </div>

        <div id="vditor" className="vditor"></div>
      </div>
    </DefaultLayout>
  );
};

export default CreateNewPostPage;
