import { useRouter } from 'next/router';
import DefaultLayout from '../../layouts/Default';
import { useUser } from '../../lib/hooks/useUser';

const DashboardPage = () => {
  const { user, mutateUser } = useUser({ redirectToIfNone: '/auth' });
  const router = useRouter();

  return (
    <DefaultLayout>
      <p>
        {user?.username} / {user?.email}
      </p>

      <button
        onClick={() => {
          mutateUser(async () => {
            const r = await fetch('/api/logout');

            return r.json();
          }, false);

          router.push('/auth');
        }}
      >
        logout
      </button>
    </DefaultLayout>
  );
};

export default DashboardPage;
