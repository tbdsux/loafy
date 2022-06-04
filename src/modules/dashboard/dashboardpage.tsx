import { useRouter } from 'next/router';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import { useUser } from '../../lib/hooks/useUser';

const DashboardPage = () => {
  const { user, mutateUser } = useUser({ redirectToIfNone: '/auth' });
  const router = useRouter();

  return (
    <DefaultLayout>
      <Seo title={`Dashboard - ${user?.username}`} />

      <div className="w-11/12 mx-auto my-12">
        <div className="flex items-center justify-between">
          <button className="bg-spaceCadet opacity-80 hover:opacity-100 duration-300 text-white text-sm py-2 px-8 rounded-lg">
            create new post
          </button>

          <p className="text-sm text-right text-gray-700">
            {user?.username} ({user?.email})
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
