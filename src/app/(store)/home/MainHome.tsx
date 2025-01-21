"use client";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
import CompanyLogos from "./Logos";
import FeaturedProducts from "./FeaturedProduct";
import TopCategories from "./TopCategories";
import OurProducts from "./OurProducts";
import Grid from "./Grid";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function HomePage() {
  // Notify function that triggers the toast
  const notify = () => toast("Welcome To Our Website!");

  // Trigger the toast on page load
  useEffect(() => {
    notify();
  }, []); // Empty dependency array ensures it runs once when the component is mounted

  return (
    <div>
      <HeroSection />
      <CompanyLogos />
      <FeaturedProducts />
      <Grid />
      <TopCategories />
      <OurProducts />
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce} // Using the zoom transition
        />
      </div>
    </div>
  );
}
