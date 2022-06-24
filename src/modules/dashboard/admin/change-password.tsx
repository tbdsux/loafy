import { useRouter } from 'next/router';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { requester } from '../../../lib/fetcher';
import { useUser } from '../../../lib/hooks/useUser';
import { ApiResponse } from '../../../typings/api';

const ChangePasswordSection = () => {
  const { user } = useUser({ redirectTo: '/auth' });

  const router = useRouter();

  const currentPassInput = useRef<HTMLInputElement>(null);
  const newPassInput = useRef<HTMLInputElement>(null);
  const confirmNewPassInput = useRef<HTMLInputElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const changePassword = async () => {
    if (!btn.current) return;

    const currentPass = currentPassInput.current?.value;
    const newPass = newPassInput.current?.value;
    const confirmNewPass = confirmNewPassInput.current?.value;

    if (!currentPass || !newPass || !confirmNewPass) return;
    if (newPass != confirmNewPass) {
      toast.error('New password is not similar. Please confirm your new password.');
      return;
    }

    btn.current.innerText = 'updating...';
    btn.current.disabled = true;

    const r = await requester('/api/dashboard/admin/change-password', 'POST', {
      userid: user?.id,
      currentPass,
      newPass
    });

    const data: ApiResponse = await r.json();
    if (!r.ok) {
      btn.current.innerText = 'update';
      btn.current.disabled = false;

      toast.error(data.message);
      return;
    }
    toast.success(
      "Successfully updated the user's password. You will be logged out in a few seconds...."
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
      <h4 className="text-md font-bold text-gray-600">change password</h4>

      <div className="text-center">
        <div className="flex flex-col mt-1 px-6">
          <label htmlFor="current-pass" className="text-left text-sm text-gray-700">
            current password:
          </label>
          <input
            type="password"
            id="current-pass"
            name="current-pass"
            ref={currentPassInput}
            className="py-2 px-4 rounded-lg w-full text-sm outline-none border-2 focus:border-iris"
          />
        </div>
        <div className="flex flex-col mt-1 px-6">
          <label htmlFor="new-pass" className="text-left text-sm text-gray-700">
            new password:
          </label>
          <input
            type="password"
            id="new-pass"
            name="new-pass"
            ref={newPassInput}
            className="py-2 px-4 rounded-lg w-full text-sm outline-none border-2 focus:border-iris"
          />
        </div>
        <div className="flex flex-col mt-1 px-6">
          <label htmlFor="confirm-new-pass" className="text-left text-sm text-gray-700">
            confirm new password:
          </label>
          <input
            type="password"
            id="confirm-new-pass"
            name="confirm-new-pass"
            ref={confirmNewPassInput}
            className="py-2 px-4 rounded-lg w-full text-sm outline-none border-2 focus:border-iris"
          />
        </div>

        <button
          onClick={changePassword}
          ref={btn}
          className=" mt-3 py-2 px-4 rounded-lg ml-1 text-sm bg-iris opacity-80 hover:opacity-100 text-white duration-300 border-2 border-iris"
        >
          update
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
