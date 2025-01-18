import Image from "next/image";

const TopCategories = () => {
   return (
    <div className="mx-auto">
     <div className=" my-48 flex flex-col max-w-lg lg:max-w-7xl">
       <div className="text-xl md:text-3xl font-bold text-left md:ml-[12%]">
         Top Categories
       </div>
       <div className="flex flex-col md:flex-row justify-center gap-10 mt-5">
         {[1, 2, 3].map((num, index) => (
           <Image key={index} src={`/category-${num}.png`} alt={`Category ${num}`} width={250} height={250} />
         ))}
       </div>
     </div>
    </div>
   );
 };
 
 export default TopCategories;
 