import { useState } from "react";
import { UserProfile } from "./user-profile";
import { Friends } from "./friends";
import { ChangeUserProfile } from "./search-friends";
import { FriendRequests } from "./friend-request";

export function Sidebar() {
  const [showFriendRequest, setShowFriendRequest] = useState(false);

  return (
    <div className="bg-tomato w-md h-full">
      <UserProfile />
      <div className="grid grid-cols-2 gap-4">
        <ChangeUserProfile isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />
        <button
          onClick={() => setShowFriendRequest(false)}
          className="col-span-1 row-span-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Boton 1
        </button>
        <button
          onClick={() => setShowFriendRequest(true)}
          className="col-span-1 row-span-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Boton 2
        </button>
      </div>
      {!showFriendRequest ? <Friends /> : <FriendRequests />}
    </div>
  );
}
