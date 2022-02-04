import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { RegisterInput } from "../interfaces/interfaces";

const REGISTER_URL = '/api/auth/register';

const notification = () => {
  notifySuccess();
  setTimeout(() => {
    notifyRedirect();
  }, 1000)
}

const notifySuccess = () =>
  toast.success(
    'Your account was created successfully!',
    { duration: 1000 }
  );

const notifyRedirect = () =>
  toast.loading(
    'Redirecting...',
    { duration: 1000 }
  )

export function RegisterForm() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      const res = await axios.post(REGISTER_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.status === 201) {
        notification();
        setTimeout(() => {
          navigate("/login/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <div className="w-full">
    <label className="block mb-1" htmlFor="userName">
      Username
    </label>
    <Controller
      name="userName"
      control={control}
      render={({ field }) => (
        <input
          type="text"
          id="userName"
          {...field}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          required
        />
      )}
    />
  </div>
  <div className="w-full">
    <label className="block mb-1" htmlFor="email">
      Email Address
    </label>
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <input
          type="email"
          id="email"
          {...field}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          required
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
          required
        />
      )}
    />
  </div>
  <div className="w-full">
    <button
      className="w-full px-6 py-3 text-white bg-blue-400 rounded hover:bg-blue-500 focus:outline-none"
      type="submit"
    >
      Sign up
    </button>
  </div>
<Toaster />
</form>
  )
}
