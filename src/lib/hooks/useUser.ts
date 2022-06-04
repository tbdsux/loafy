import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { ApiResponse } from '../../typings/api';
import fetcher from '../fetcher';
import { UserProps } from '../user';

const useUser = ({ redirectTo = '', redirectToIfNone = '' }) => {
  const { data, mutate: mutateUser } = useSWR<ApiResponse<UserProps>>('/api/user', fetcher);

  useEffect(() => {
    if ((!redirectTo && !redirectToIfNone) || !data) return;

    // failed / no data in user
    if (!data.data) {
      Router.push(redirectToIfNone);
      return;
    }

    // push to redirect
    Router.push(redirectTo);
  }, [data, mutateUser, redirectTo, redirectToIfNone]);

  return { user: data?.data, mutateUser };
};

export { useUser };
