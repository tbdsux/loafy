import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import BaseModal from '../../../components/Modal';
import { requester } from '../../../lib/fetcher';
import { ApiResponse } from '../../../typings/api';

interface DeletePostModalProps {
  postid: number;
}

const DeletePostModal = ({ postid }: DeletePostModalProps) => {
  const [open, setOpen] = useState(false);

  const confirmBtn = useRef<HTMLButtonElement>(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const resetBtn = () => {
    if (!confirmBtn.current) return;
    confirmBtn.current.innerText = 'confirm';
    confirmBtn.current.disabled = false;
  };

  const deletePost = async () => {
    if (!confirmBtn.current) return;

    confirmBtn.current.innerText = 'deleting...';
    confirmBtn.current.disabled = true;

    try {
      const r = await requester(`/api/dashboard/posts/delete/${postid}`, 'DELETE');

      const data: ApiResponse = await r.json();

      if (!r.ok) {
        resetBtn();
        toast.error(data.message);
        return;
      }

      // mutate the user posts so it gets updated
      mutate('/api/dashboard/posts');

      toast.success('Successfully deleted the post.');

      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (err) {
      resetBtn();
      toast.error(String(err));
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-500 opacity-80 hover:opacity-100 duration-300 text-white py-1 px-3 rounded-lg text-xs mx-1"
      >
        delete
      </button>

      <BaseModal open={open} closeModal={closeModal}>
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
          Are you sure you want to delete this post?
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-gray-500">
            If you confirm, this post will be deleted forever and will not be recoverable.
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            ref={confirmBtn}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={deletePost}
          >
            confirm
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default DeletePostModal;
