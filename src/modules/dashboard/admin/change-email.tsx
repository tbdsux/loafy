import { useRouter } from 'next/router';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { requester } from '../../../lib/fetcher';
import { useUser } from '../../../lib/hooks/useUser';
import { ApiResponse } from '../../../typings/api';

const ChangeEmailSection = () => {
  const { user } = useUser({ redirectTo: '/auth' });

  const router = useRouter();

  const emailInput = useRef<HTMLInputElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const changeEmail = async () => {
    if (!btn.current) return;

    const email = emailInput.current?.value;
    if (!email) return;
    if (email === user?.email) return;

    btn.current.innerText = 'changing...';
    btn.current.disabled = true;

    const r = await requester('/api/dashboard/admin/change-email', 'POST', {
      userid: user?.id,
      newEmail: email
    });

    const data: ApiResponse = await r.json();
    if (!r.ok) {
      btn.current.innerText = 'change';
      btn.current.disabled = false;

      toast.error(data.message);
      return;
    }

    toast.success(
      "Successfully updated the user's email. You will be logged out in a few seconds...."
    );

    const logout = await fetch('/api/logout');
    if (logout.ok) {
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    }
  };

  return (
    <div className="w-full p-8 rounded-lg shadow-lg mx-1 border">
      <h4 className="text-md font-bold text-gray-600">change email</h4>

      <div className="flex flex-col mt-1 px-6">
        <label htmlFor="email" className="text-sm text-gray-700">
          new email:
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="email"
            name="email"
            ref={emailInput}
            defaultValue={user?.email}
            className="py-2 px-4 rounded-lg w-full text-sm outline-none border-2 focus:border-iris"
          />
          <button
            onClick={changeEmail}
            ref={btn}
            className="py-2 px-4 rounded-lg ml-1 text-sm bg-iris opacity-80 hover:opacity-100 text-white duration-300 border-2 border-iris"
          >
            change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailSection;
