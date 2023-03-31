import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Auth from "../../components/layouts/Auth";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  return (
    <>
      <Auth>
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full content-center items-center justify-center">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-[#eff6ff] shadow-lg">
                <div className="mb-0 rounded-t px-6 py-6">
                  <hr className="border-b-1 mt-6 border-[#CBD5E1]" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      signIn("email", {
                        email,
                        callbackUrl: "/home",
                      });
                    }}>
                    <div className="relative mb-3 w-full">
                      <label
                        className="mb-2 block text-xs font-bold uppercase text-gray-900"
                        htmlFor="grid-password">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-[#475569] placeholder-[#CBD5E1] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        className="mr-1 mb-1 mt-3 w-full rounded bg-[#1E293B] px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg active:bg-[#475569]"
                        type="submit">
                        Sign In
                      </button>
                    </div>
                    <div className="mb-3 py-3 text-center">
                      <h6 className="text-sm font-semibold text-gray-900">Sign in with</h6>
                    </div>
                    <div className="w-full text-center">
                      <button
                        className="mr-1 mb-1 flex w-full items-center  justify-center rounded bg-white px-4 py-2 text-xs font-normal uppercase text-[#334155] shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-md active:bg-[#F8FAFC]"
                        type="button"
                        onClick={() =>
                          signIn(providers.google.id, {
                            callbackUrl: "/home",
                          })
                        }>
                        <Image
                          alt="..."
                          className="mr-1 w-6"
                          src="/img/google.svg"
                          height={36}
                          width={36}
                        />
                        &nbsp;{providers.google.name || "Google"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap">
                <div className="w-full text-right">
                  <Link href="/auth/register">
                    <a className="text-gray-900">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
