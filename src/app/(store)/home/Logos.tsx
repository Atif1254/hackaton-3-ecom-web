import Image from "next/image";

const CompanyLogos = () => {
   return (
     <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-evenly">
       {['home-logo-1', 'home-logo-2', 'home-logo-3', 'home-logo-4', 'home-logo-5', 'home-logo-6', 'home-logo-7'].map((logo, index) => (
         <Image key={index} src={`/${logo}.png`} alt={`Logo ${index + 1}`} width={80} height={80} />
       ))}
     </div>
   );
 };
 
 export default CompanyLogos;
 