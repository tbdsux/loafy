import { Posts } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
import { ApiResponse } from '../../typings/api';
import PostContainer from '../dashboard/post-container';

interface ShowAllPostsProps {
  defaultPosts?: ApiResponse<Posts[]>;
}

const ShowAllPosts = ({ defaultPosts }: ShowAllPostsProps) => {
  const { data } = useSWR<ApiResponse<Posts[]>>('/api/posts', fetcher, {
    fallbackData: defaultPosts
  });

  if (!data) {
    return <p>loading...</p>;
  }

  if (data.data?.length === 0) {
    return <p>No current posts...</p>;
  }

  return (
    <ul>
      {data.data?.map((p) => (
        <PostContainer key={p.id} post={p} />
      ))}
    </ul>
  );
};

export default ShowAllPosts;
