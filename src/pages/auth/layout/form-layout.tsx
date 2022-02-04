import { Link as LinkRoute } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  type: "login" | "register";
}

export default function FormLayout({ children, type }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800 dark:bg-gray-800">
      <div className="w-full max-w-lg py-12 px-6 mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            {type === "login"
              ? "Sign in to your account"
              : "Sign up"
            }
          </h1>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-700 shadow-lg p-8 space-y-4">
          {children}
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <p>
                {type === "login"
                  ? "You don't have an account?"
                  : "You have an account?"
                }
              </p>
              <LinkRoute className="text-blue-400" to={type === "login" ? `/register/` : `/login/`}>
                {type === "login"
                  ? "Register"
                  : "Login"
                }
              </LinkRoute>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}