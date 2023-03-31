import Link from "next/link";

const VerifyRequest = () => {
  return (
    <>
      <div className="flex h-screen items-center ">
        <div className="bg-full absolute top-0 h-full w-full bg-[#37474F] bg-no-repeat"></div>
        <Link href="https://mail.google.com/">
          <div className="w-97 group relative mx-auto overflow-hidden rounded-[16px] bg-gray-300 p-[2px] transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
            <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
            <div className="relative rounded-[15px] bg-white p-6">
              <div className="space-y-4">
                <img src="/img/notification-icon.svg" alt="" />
                <p className="text-lg font-semibold text-slate-800">Check your email</p>
                <p className="font-md text-slate-500">
                  A sign in link has been sent to your mail address .
                </p>
                <button className="text-center hover:text-blue-500" type="button">
                  Click here to open your mail
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VerifyRequest;
