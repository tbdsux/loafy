import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import { useUser } from '../../lib/hooks/useUser';
import { ApiResponse } from '../../typings/api';

const LoginPage = () => {
  useUser({ redirectTo: '/dashboard' });

  const router = useRouter();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailInput.current?.value ?? '';
    const password = passwordInput.current?.value ?? '';

    if (!email || !password) {
      // handle it here
      return;
    }

    const body = { email, password };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        // internal problem in here
      }

      const data = (await res.json()) as ApiResponse;

      if (!data.success) {
        // failed to login in here
      }

      router.push('/dashboard');
    } catch (err) {
      console.log(err);

      // handle error in here
    }
  };

  return (
    <DefaultLayout>
      <Seo title="Authenticate login" />

      <div className="w-5/6 mx-auto py-32">
        <form onSubmit={login} className="text-center w-2/5 mx-auto shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-black text-third">login account</h3>
          <p>authenticate your user account to continue...</p>

          <hr className="my-6" />

          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-left">
              email
            </label>
            <input
              className="py-2 px-4 rounded-lg border"
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
              className="py-2 px-4 rounded-lg border"
              placeholder="your password"
              type="password"
              name="password"
              id="password"
              ref={passwordInput}
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="py-2 px-12 rounded-lg bg-third hover:bg-second text-white duration-300"
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
