import "./globals.css";
const Page = () => {
  return (
    <div className="bg-purple-950 text-white ">
      <section className="flex py-8 flex-wrap items-center justify-center w-full px-24">
        <div className="w-1/2 pr-5">
          <h1 className="text-2xl w-1/3 ">
            Connecting <br />
            <span className="font-bold"> Teachers, Students, Programming</span>
          </h1>
          <div className="w-1/4 my-2 h-2 bg-purple-400"></div>
          <p className="mt-4 text-xl text-gray-300 ">
            Explore the codes across various topics using different languages,
            gain coding skills, & stand out in crowd
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2 ">
          <img src="/img/Code review-amico.svg" />
        </div>
      </section>
      <section className="w-full p-8 bg-gradient-to-r from-[#FFFFFF] to-[#A169B4] flex gap-2 ">
        <div className="rounded-2xl overflow-hidden">
          <img src="/img/programming evolution.jpg" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img src="/img/programming evolution.jpg" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img src="/img/programming evolution.jpg" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img src="/img/programming evolution.jpg" />
        </div>
      </section>
    </div>
  );
};

export default Page;
