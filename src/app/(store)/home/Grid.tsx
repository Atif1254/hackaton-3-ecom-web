import Image from "next/image";
import product1 from "../../../../public/sofa-1.png";
import product2 from "../../../../public/our-product-8.png";


export default function Grid() {
  return (
    <>
      <div className="my-20 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-6xl mx-auto">
        {/* Heading */}
        <div className=" text-4xl md:text-5xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-black bg-clip-text text-transparent">
          <h1> UPTO 70% OFF! </h1>
        </div>
        {/* Content */}
        <div className="max-w-6xl animate-pulse duration-2000 flex flex-col items-center justify-center gap-5 bg-gray-50 rounded-xl">
          {/* Image 1 */}
          <div>
            <Image
              className="w-[620px] h-[300px] object-full relative rounded-lg"
              src={product1}
              alt="Error"
              width={300}
              height={300}
            />
          </div>
          {/* Image 2 */}
          <div className="flex flex-row gap-5">
            <div>
              <Image src={product2} alt="Error" width={300} height={300} />
            </div>
            {/* Image 3 */}
            <div>
              <Image src={product2} alt="Error" width={300} height={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
