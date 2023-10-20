export default function AboutUsBlocks({ heading, text }) {
  return (
    <div
      data-aos="fade-up"
      className="w-full md:w-[45%] p-4 m-4 border rounded-md transition-all bg-white bg-opacity-40 shadow-md hover:bg-slate-200 hover:bg-opacity-100 hover:scale-105 hover:shadow-xl"
    >
      <h3 className="text-lg md:text-2xl font-bold">{heading}</h3>
      <p className="p-3 md:p-9">{text}</p>
    </div>
  );
}
