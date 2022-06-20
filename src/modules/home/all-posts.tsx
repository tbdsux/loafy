import { Posts } from '@prisma/client';
import useSWR from 'swr';
import { LinkButton } from '../../components/LinkButton';
import fetcher from '../../lib/fetcher';
import { postsPerPage } from '../../lib/utils';
import { ApiResponse } from '../../typings/api';
import PostContainer from '../dashboard/post-container';

interface ShowAllPostsProps {
  defaultPosts?: ApiResponse<Posts[]>;
  page: number;
}

const ShowAllPosts = ({ defaultPosts, page }: ShowAllPostsProps) => {
  const { data } = useSWR<ApiResponse<Posts[]>>(`/api/posts?page=${page}`, fetcher, {
    fallbackData: defaultPosts
  });

  if (!data) {
    return <p>loading...</p>;
  }

  if (data.data?.length === 0) {
    return <p>No current posts...</p>;
  }

  return (
    <div>
      <ul>
        {data.data?.map((p) => (
          <PostContainer key={p.id} post={p} />
        ))}
      </ul>

      <div className=" mt-8 flex items-center justify-between">
        <div>
          {page > 1 ? (
            <LinkButton
              className="py-3 px-8 rounded-lg bg-iris opacity-80 hover:opacity-100 duration-300 text-white text-sm"
              href={`/${page == 2 ? '' : '?page=' + String(page - 1)}`}
            >
              prev
            </LinkButton>
          ) : (
            <></>
          )}
        </div>

        <div>
          {page >= 1 && (data.data?.length ?? 0) == postsPerPage ? (
            <LinkButton
              className="py-3 px-8 rounded-lg bg-iris opacity-80 hover:opacity-100 duration-300 text-white text-sm"
              href={`/?page=${page + 1}`}
            >
              next
            </LinkButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllPosts;
