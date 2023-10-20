import Image from "next/image";

export default function BlogModalSidebar({ author }) {
  const profile_image_size = 200;
  return (
    <aside className="w-full max-w-[25%] border-r border-slate-900">
      <div className="flex flex-col items-center p-5">
        <div>
          <a className="rounded-full" href={author.url} target="_blank">
            <Image
              alt="author Pic"
              height={profile_image_size}
              width={profile_image_size}
              className="rounded-full border border-double border-slate-800"
              src={author.profile_image}
            />
          </a>
          <h3 className="text-2xl font-bold text-center p-3">{author.name}</h3>
        </div>
        <hr className="bg-slate-900 h-[2px] my-4 w-full" />

        <div className="w-full">
          <h3 className="text-xl font-bold">About</h3>
        </div>
        <div className="p-4">
          <strong>Bio:</strong>
          {author.bio}
        </div>
      </div>
    </aside>
  );
}
