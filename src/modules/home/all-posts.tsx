import { Posts } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
import { ApiResponse } from '../../typings/api';
import PostContainer from '../dashboard/post-container';

const ShowAllPosts = () => {
  const { data } = useSWR<ApiResponse<Posts[]>>('/api/posts', fetcher);

  if (!data) {
    return <p>loading...</p>;
  }

  return (
    <ul>
      {data?.data?.map((p) => (
        <PostContainer key={p.id} post={p} />
      ))}
    </ul>
  );
};

export default ShowAllPosts;
