import Link from "next/link";
import landingImage from "@/app/assets/landing.jpg";
import Image from "next/image";
import BlogsComp from "./components/Blogs";
import Trial from "./components/Trial";

function NavBar() {
  const style_listItem = "text-center";
  const style_listLink =
    "p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white";
  return (
    <>
      <header className="h-[7dvh] z-10 flex justify-around items-center sticky top-0 shadow-md bg-slate-400">
        <div className="logo">
          <h3 className="text-xl font-bold">PictureNarrate</h3>
        </div>
        <nav className=" flex-[0.7]">
          <ui className="flex list-none items-center justify-around">
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#"}>
                Home
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#gallary"}>
                Gallary
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#blogs"}>
                OurBlogs
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#about"}>
                AboutUs
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#contact"}>
                ContactUs
              </Link>
            </li>
          </ui>
        </nav>
      </header>
    </>
  );
}

function Banner() {
  const style_banner = "w-full h-[93dvh]";
  const style_imageDiv = "absolute h-[93dvh] w-full flex justify-center z-[-1]";
  const style_contentDiv =
    "flex h-full  items-center justify-between text-black";
  const style_callToActionDiv = "";
  const style_callToActionButton =
    "bg-slate-800 p-5 rounded text-white text-xl hover:bg-slate-600";
  return (
    <>
      <section className={style_banner}>
        <div className={style_imageDiv}>
          <Image priority src={landingImage} alt="pic"/>
        </div>
        <div className={style_contentDiv}>
          <div className="flex flex-col items-center gap-7">
            <h1 className="text-2xl font-bold">
              Transforming Images Into Enthralling Stories!
            </h1>
            <div className={style_callToActionDiv}>
              <button className={style_callToActionButton}>Check it Out</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MainBody() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-between">
        <Banner />
        <div className="w-full top-[93dvh]">
          <BlogsComp />
          <Trial />
          {/* <Gallary /> */}
        </div>
      </main>
    </>
  );
}

export default async function Home() {
  return (
    <div>
      <NavBar />
      <MainBody />
    </div>
  );
}
