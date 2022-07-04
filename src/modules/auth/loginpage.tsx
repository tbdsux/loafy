import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import { requester } from '../../lib/fetcher';
import { useUser } from '../../lib/hooks/useUser';
import { ApiResponse } from '../../typings/api';

const LoginPage = () => {
  useUser({ redirectTo: '/dashboard', redirectIfFound: true });

  const router = useRouter();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailInput.current?.value ?? '';
    const password = passwordInput.current?.value ?? '';

    if (!email || !password) {
      // handle it here
      return;
    }

    const body = { email, password };

    if (!loginBtn.current) return;
    loginBtn.current.innerText = 'logging in...';
    loginBtn.current.disabled = true;

    const r = await requester('/api/login', 'POST', body);

    const data: ApiResponse = await r.json();

    if (!r.ok) {
      loginBtn.current.innerText = 'login';
      loginBtn.current.disabled = false;

      // failed to login in here
      toast.error(data.message);

      return;
    }

    toast.success('Succesfully logged in.');

    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <DefaultLayout>
      <Seo title="Authenticate login" />

      <div className="w-5/6 mx-auto py-32">
        <form onSubmit={login} className="text-center w-2/5 mx-auto shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-black text-spaceCadet">login account</h3>
          <p className="text-gray-700">authenticate your user account to continue...</p>

          <hr className="my-6" />

          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-left">
              email
            </label>
            <input
              className="py-2 px-4 rounded-lg border-2 outline-none focus:border-iris"
              placeholder="your email address"
              type="text"
              name="email"
              id="email"
              ref={emailInput}
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password" className="text-left">
              password
            </label>
            <input
              className="py-2 px-4 rounded-lg border-2 outline-none focus:border-iris"
              placeholder="your password"
              type="password"
              name="password"
              id="password"
              ref={passwordInput}
            />
          </div>

          <div className="mt-8">
            <button
              ref={loginBtn}
              type="submit"
              className="py-2 px-12 rounded-lg bg-iris opacity-80 hover:opacity-100 hover:bg-second text-white duration-300"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
