import { SettingsIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAuth } from "../context";
import { ChangeUserProfile } from "./change-user-profile";

export function UserProfile() {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex items-center p-2 h-32 border-2 border-blue-500">
        <div className="grid place-items-center relative">
          <img src={auth?.imagePath} className="w-20 h-20 rounded-full" />
          <SettingsIcon 
            className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent hover:text-red-500 hover:backdrop-blur-md cursor-pointer"
            onClick={openModal}
          />
        </div>
        <div className="ml-3">
          <p className="font-normal text-3xl">
            {auth?.userName}
          </p>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <ChangeUserProfile isOpen={isOpen} onClose={closeModal} />
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
