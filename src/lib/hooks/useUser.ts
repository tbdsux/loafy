import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { ApiResponse } from '../../typings/api';
import fetcher from '../fetcher';
import { UserProps } from '../user';

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const { data: user, mutate: mutateUser } = useSWR<ApiResponse<UserProps>>('/api/user', fetcher);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && user.data == null) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user.data != null)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user: user?.data, mutateUser };
};

export { useUser };
