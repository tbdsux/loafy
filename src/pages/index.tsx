import { Posts } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import urlJoin from 'url-join';
import HomePage from '../modules/home';
import { ApiResponse } from '../typings/api';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { page } = query;
  const pageNum = Number(page ? (Array.isArray(page) ? 1 : page) : 1);

  const r = await fetch(urlJoin(process.env.API_URL ?? '', `/posts?page=${pageNum}`));
  const data: ApiResponse<Posts[]> = await r.json();

  return {
    props: {
      data,
      page: pageNum
    }
  };
}

export default HomePage;
