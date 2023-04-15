import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useS3Upload } from "next-s3-upload";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery();
  const [imageUrl, setImageUrl] = useState<string>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  // NOTE - test logging with Axiom
  // log.info("what the fuck is this");
  return (
    <>
      <Head>
        <title>Aladin</title>
        <meta name="description" content="An E-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FileInput onChange={handleFileChange} />
      <button onClick={openFileDialog}>Upload file</button>
      <pre>{imageUrl}</pre>
      {imageUrl && <img src={imageUrl} alt="" />}

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>

        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
          <TechnologyCard
            name="NextJS"
            description="The React framework for production"
            documentation="https://nextjs.org/"
          />
          <TechnologyCard
            name="TypeScript"
            description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
            documentation="https://www.typescriptlang.org/"
          />
          <TechnologyCard
            name="TailwindCSS"
            description="Rapidly build modern websites without ever leaving your HTML"
            documentation="https://tailwindcss.com/"
          />
          <TechnologyCard
            name="tRPC"
            description="End-to-end typesafe APIs made easy"
            documentation="https://trpc.io/"
          />
          <TechnologyCard
            name="Next-Auth"
            description="Authentication for Next.js"
            documentation="https://next-auth.js.org/"
          />
          <TechnologyCard
            name="Prisma"
            description="Build data-driven JavaScript & TypeScript apps in less time"
            documentation="https://www.prisma.io/docs/"
          />
        </div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
        {/* NOTE - Test image optimization with Google Drive link */}
        <Image
          src="https://drive.google.com/uc?id=1VOlbk8vSr-e0Gdt7Pd_Cs-0TN0EZXFjs"
          alt="NextJS Logo"
          width={500}
          height={500}
          priority
        />
        <pre>{JSON.stringify({ testing: "hello" }, null, 2)}</pre>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </main>
    </>
  );
};
export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">Logged in as {sessionData?.user?.name}</p>
      )}
      {secretMessage && <p className="text-2xl text-blue-500">{secretMessage}</p>}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({ name, description, documentation }: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer">
        Documentation
      </a>
    </section>
  );
};
