import { useRouter } from 'next/router';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { requester } from '../../../lib/fetcher';
import { useUser } from '../../../lib/hooks/useUser';
import { ApiResponse } from '../../../typings/api';

const ChangeNameSection = () => {
  const { user } = useUser({ redirectTo: '/auth' });

  const router = useRouter();

  const usernameInput = useRef<HTMLInputElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const changeUsername = async () => {
    if (!btn.current) return;

    const username = usernameInput.current?.value;
    if (!username) return;
    if (user === user?.username) return;

    btn.current.innerText = 'renaming...';
    btn.current.disabled = true;

    const r = await requester('/api/dashboard/admin/change-name', 'POST', {
      userid: user?.id,
      newUsername: username
    });

    const data: ApiResponse = await r.json();
    if (!r.ok) {
      btn.current.innerText = 'rename';
      btn.current.disabled = false;

      toast.error(data.message);
      return;
    }

    toast.success(
      "Successfully updated the user's username. You will be logged out in a few seconds...."
    );

    const logout = await fetch('/api/logout');
    if (logout.ok) {
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    }
  };

  return (
    <div className="w-full rounded-lg p-8 shadow-lg mx-1 border">
      <h4 className="text-md font-bold text-gray-600">change username</h4>

      <div className="flex flex-col mt-1 px-6">
        <label htmlFor="username" className="text-sm text-gray-700">
          new username:
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameInput}
            defaultValue={user?.username}
            className="py-2 px-4 rounded-lg w-full text-sm outline-none border-2 focus:border-iris"
          />
          <button
            onClick={changeUsername}
            ref={btn}
            className="py-2 px-4 rounded-lg ml-1 text-sm bg-iris opacity-80 hover:opacity-100 text-white duration-300 border-2 border-iris"
          >
            rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeNameSection;
