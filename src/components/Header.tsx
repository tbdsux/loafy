import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks/useUser';

const Header = () => {
  const { user, mutateUser } = useUser({});
  const router = useRouter();

  const logout = () => {
    mutateUser(async () => {
      const r = await fetch('/api/logout');

      return r.json();
    }, false);

    router.push('/auth');
  };

  return (
    <nav className="border-b border-iris py-4">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-iris">loafy</h1>

        <ul>
          <li>
            <a href="#" className="text-sm hover:text-iris">
              all posts
            </a>
          </li>
        </ul>

        {user != null ? (
          <ul className="inline-flex items-center text-sm">
            <li className="mx-12">
              <Link href="/dashboard">
                <a className="bg-iris opacity-80 hover:opacity-100 duration-300 text-white py-2 px-6 rounded-lg">
                  dashboard
                </a>
              </Link>
            </li>
            <li>
              <button onClick={logout}>logout</button>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Header;
