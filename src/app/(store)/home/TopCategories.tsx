import Image from "next/image";

const TopCategories = () => {
   return (
    <div className="mx-auto">
     <div className=" ml-[20%] sm:ml-[30%] md:ml-[0%] lg:m-auto my-20 flex flex-col max-w-lg md:max-w-5xl lg:max-w-7xl">
       <div className=" md:ml-[10%] lg:ml-[10%] text-4xl md:text-5xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-black bg-clip-text text-transparent">
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
 