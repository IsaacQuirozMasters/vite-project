import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import axios from "../../../api/axios";
import { LoginInput } from "../interfaces/interfaces";
import { User } from "../../../context/interfaces";

const LOGIN_URL = '/api/auth/login';

export function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await axios.post<User>(LOGIN_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.status === 201) {
        console.log(res.data)
        setAuth(res.data);
        setTimeout(() => {
          navigate("/",);
        }, 1000);

      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <div className="w-full">
    <label className="block mb-1" htmlFor="email">
      Email address
    </label>
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <input
          type="text"
          id="email"
          {...field}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
        />
      )}
    />
  </div>
  <div className="w-full">
    <label className="block mb-1" htmlFor="password">
      Password
    </label>
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <input
          type="password"
          id="password"
          {...field}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
        />
      )}
    />
  </div>
  <div className="w-full">
    <button
      className="w-full px-6 py-3 text-white bg-blue-400 rounded hover:bg-blue-500 focus:outline-none"
      type="submit"
    >
      Sign in
    </button>
  </div>
</form>

  )
}