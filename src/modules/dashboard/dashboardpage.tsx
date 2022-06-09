import { LinkButton } from '../../components/LinkButton';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import { useUser } from '../../lib/hooks/useUser';
import ShowUserPosts from './show-user-posts';

const DashboardPage = () => {
  const { user } = useUser({ redirectTo: '/auth' });

  return (
    <DefaultLayout>
      <Seo title={`Dashboard - ${user?.username}`} />

      <div className="w-11/12 mx-auto my-12">
        <div className="flex items-center justify-between mb-4">
          <LinkButton
            href="/dashboard/new-post"
            className="bg-spaceCadet opacity-80 hover:opacity-100 duration-300 text-white text-sm py-2 px-8 rounded-lg"
          >
            create new post
          </LinkButton>

          <p className="text-sm text-right text-gray-700">
            {user?.username} ({user?.email})
          </p>
        </div>

        <ShowUserPosts />
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
