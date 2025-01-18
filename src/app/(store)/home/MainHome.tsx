import HeroSection from './HeroSection';
import CompanyLogos from './Logos';
import FeaturedProducts from './FeaturedProduct';
import TopCategories from './TopCategories';
import OurProducts from './OurProducts';


export default function HomePage(){

  return (
    <div>
      <HeroSection />
      <CompanyLogos />
      <FeaturedProducts />
      <TopCategories />
      <OurProducts />
    </div>
  );
};

