// import landingImage from "@/app/assets/landing.jpg";
import BlogsComp from "./components/Blog/Blogs";
import Gallery from "./components/Gallery";
import Script from "next/script";
import NavBar from "./components/NavBar/NavComp";
import Banner from "./components/Hero/Banner";
import AboutUs from "./components/About/AboutUs";
import Footer from "./components/Footer/Footer";

export default async function Home() {
  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center justify-between font-mono overflow-hidden">
        <Banner />
        <div className="w-full">
          <AboutUs />
          <BlogsComp />
          <Gallery />
        </div>
        <Footer />
      </main>
      <Script>
        {'AOS.init()'}
      </Script>
    </div>
  );
}
