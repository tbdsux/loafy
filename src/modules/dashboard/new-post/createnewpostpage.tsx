import { useEffect, useRef, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import { requester } from '../../../lib/fetcher';
import { PostProps } from '../../../lib/posts';
import { ApiResponse } from '../../../typings/api';

const CreateNewPostPage = () => {
  const [vd, setVd] = useState<Vditor>();

  const titleInput = useRef<HTMLInputElement>(null);

  const createPost = async () => {
    const value = vd?.getValue() ?? '';
    const title = titleInput.current?.value ?? '';

    if (!value || !title) return; // no content and title

    const post: PostProps = {
      content: value,
      title,
      slug: title.trim().toLowerCase().replaceAll(' ', '-'),
      published: true
    };

    const r = await requester('/api/dashboard/new-post', post);

    const data: ApiResponse = await r.json();

   console.log(data)
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
        <div className="flex items-center justify-between mb-4">
          <input
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

        <div id="vditor" className="vditor"></div>
      </div>
    </DefaultLayout>
  );
};

export default CreateNewPostPage;
