import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { User } from "../context/interfaces";
import { nanoid } from "nanoid";

const REQUEST_MY_FRIENDS_URL = '/api/user/friend-request/me/friends'

export function Friends() {
  const axiosPrivate = useAxiosPrivate();
  const [friends, setFriends] = useState<User[]>();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axiosPrivate.get(REQUEST_MY_FRIENDS_URL);
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [axiosPrivate])

  return (
    <>
      {friends?.map((friend: User) => (
        <div key={nanoid()} className='flex items-center p-2 h-32 border-2 border-blue-500'>
          <img src={friend.imagePath} className='w-16 h-16 rounded-full' />
          <div className='ml-3'>
            <p className='font-normal text-3xl'>
              {friend.userName}
            </p>
          </div>
        </div>
      ))
      }
    </>
  )
}