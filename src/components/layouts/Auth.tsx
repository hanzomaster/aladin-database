// components

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <section className="relative h-full min-h-screen w-full py-40">
          <div
            className="bg-full absolute top-0 h-full w-full bg-white bg-no-repeat"
            // style={{
            //   backgroundImage: "url('/img/register_bg_2.png')",
            // }}
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
