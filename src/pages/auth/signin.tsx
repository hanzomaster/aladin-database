import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavBar from "../../components/navbar";
import Auth from "../../components/layouts/Auth";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  return (
    <>
        <section className="container top-0">
          <NavBar />
        </section>
      <Auth>
        <div className="container mx-auto h-full px-4">
          <div className="flex flex-row items-center justify-center">
            <div className=" lg:w-6/12 ">
              <div className="relative w-full">
                <div className="px-4 pt-0">
                  <div className=""></div>
                      <Image
                          alt="..."
                          className="w-full"
                          src="/img/login.svg"
                          height={96}
                          width={96}
                        />
                  </div>
                </div>
            </div>
            <div className="w-full lg:w-4/12 ">
              <div className="relative flex w-full min-w-0 flex-col ">
                <div className="flex-auto px-4 pt-0 lg:px-10">
                  <div className="flex justify-center items-center">
                  <Image
                          alt="..."
                          className="w-60"
                          src="/img/logo.png"
                          height={48}
                          width={48}
                        />
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      signIn("email", {
                        email,
                        callbackUrl: "/home",
                      });
                    }}>
                    <div className="relative mb-3 w-full">
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded border-2 bg-[#f2f7fc] px-3 py-3 text-sm text-[#475569] placeholder-[#62768e] transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Nhập Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mt-2 text-center">
                      <button
                        className="mb-1 mr-1 mt-3 w-full rounded bg-[#1E293B] px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg active:bg-[#475569]"
                        type="submit">
                        Đăng nhập
                      </button>
                    </div>
                    <div className="mt-3 w-full text-center text-xl ">
                      <Link legacyBehavior href="/auth/register">
                        <a className="text-gray-900 hover:text-red-500">
                          <small>Tạo tài khoản mới</small>
                        </a>
                      </Link>
                    </div>

                    <div className="rounded-t">
                      <hr className="border-b-0 mt-8 border-[#CBD5E1]" />
                    </div> 
                    <div className="py-3 text-center">
                      <h6 className="text-sm font-semibold text-gray-900">Hoặc sử dụng</h6>
                    </div>
                    <div className="w-full text-center">
                      <button
                        className="mb-10 mr-1 flex w-full items-center  justify-center rounded bg-white px-4 py-2 text-xs font-normal uppercase text-[#334155] border-2 transition-all duration-150 ease-linear focus:outline-none hover:shadow-md active:bg-[#F8FAFC]"
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
