import { Posts } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import urlJoin from 'url-join';
import HomePage from '../modules/home';
import { ApiResponse } from '../typings/api';

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const r = await fetch(urlJoin(process.env.API_URL ?? '', '/posts'));
  const data: ApiResponse<Posts[]> = await r.json();

  return {
    props: {
      data
    }
  };
}

export default HomePage;
