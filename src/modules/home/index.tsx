import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';

const HomePage = () => {
  return (
    <DefaultLayout>
      <Seo title="Welcome" />

      <div className="w-11/12 mx-auto my-12">
        <p>posts should be in here</p>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
