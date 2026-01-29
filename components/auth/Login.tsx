import React from "react";
import Image from "next/image";
import { auth, signIn } from "@/auth";

const Login = async () => {
  const session = await auth();

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
      <div className="flex flex-col w-full max-w-900 p-36 min-h-600 mx-auto bg-[#faebd7] rounded-lg sm:w-400">
        <div className="p-20">
          <p className="text-25 mb-30">Log in to collaborate on "Pitch Startup App"</p>
          <div className="flex flex-col gap-20">
            {/* Auth */}
            <form
              className="contents"
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="justify-center	gap-10 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
              >
                <Image src="/icons-google.png" alt="Google icon" width={40} height={40} />
                Sign in Google
              </button>
            </form>
            <form
              className="contents"
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="justify-center	gap-10 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
              >
                <Image src="/icons-github.png" alt="Github icon" width={40} height={40} />
                Sign in Github
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
