import { Posts } from '@prisma/client';
import { NextPage } from 'next';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import { ApiResponse } from '../../typings/api';
import ShowAllPosts from './all-posts';

interface HomePageProps {
  data: ApiResponse<Posts[]>;
  page: number;
}

const HomePage: NextPage<HomePageProps> = ({ data, page }) => {
  return (
    <DefaultLayout>
      <Seo title="Welcome" />

      <div className="w-3/4 mx-auto my-12">
        <ShowAllPosts defaultPosts={data} page={page} />
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
