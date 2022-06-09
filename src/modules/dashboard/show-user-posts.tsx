import { Posts } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
import { useUser } from '../../lib/hooks/useUser';
import { ApiResponse } from '../../typings/api';
import PostContainer from './post-container';

const ShowUserPosts = () => {
  const { user } = useUser({ redirectTo: '/auth' });
  const { data } = useSWR<ApiResponse<Posts[]>>('/api/dashboard/posts', fetcher);

  if (!data?.data) {
    return <p>loading...</p>;
  }

  return (
    <ul className="w-5/6 mx-auto my-12">
      {data.data?.map((p) => (
        <PostContainer key={p.id} post={p} user={user} />
      ))}
    </ul>
  );
};

export default ShowUserPosts;
