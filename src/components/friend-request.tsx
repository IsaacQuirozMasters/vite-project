import { useEffect, useState } from "react";
import { FriendRequest } from "../context/interfaces";
import { nanoid } from "nanoid";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import {FaWindowClose} from "react-icons/fa";
import {BsFillPatchCheckFill} from "react-icons/bs";

const RECEIVED_REQUEST_URL = '/api/user/friend-request/me/received-requests';
const RESPOND_FRIEND_REQUEST_URL = '/api/user/friend-request/response/'

export function FriendRequests() {
  const axiosPrivate = useAxiosPrivate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const response = await axiosPrivate.get(RECEIVED_REQUEST_URL);
        setFriendRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriendRequests();
  }, [])

  async function respondToFriendRequest(id: string, status: string) {
    const data = { status }
    try {
      await axiosPrivate.put(RESPOND_FRIEND_REQUEST_URL + id,
        JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {friendRequests?.map((request: FriendRequest) => (
        <div key={nanoid()} className="flex items-center p-2 h-32 border-2 border-violet">
          <img src={request?.creator.imagePath} className="w-16 h-16 rounded-full" />
          <div className="ml-3">
            <p className="font-normal text-3xl">
              {request?.creator.userName}
            </p>
          </div>
          <button
            className="rounded-full w-1"
            onClick={() => respondToFriendRequest(request.creator.id, 'accepted')}
          >
            <BsFillPatchCheckFill/>
          </button>
          <button
            className="rounded-full w-1"
            onClick={() => respondToFriendRequest(request.creator.id, 'rejected')}
          >
            <FaWindowClose/>
          </button>
        </div>
      ))}
    </>
  )
}
