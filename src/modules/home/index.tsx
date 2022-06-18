import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import ShowAllPosts from './all-posts';

const HomePage = () => {
  return (
    <DefaultLayout>
      <Seo title="Welcome" />

      <div className="w-3/4 mx-auto my-12">
        <ShowAllPosts />
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
