import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <>
      <section className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-7xl my-[150px]">
        {/* Heading */}
        <div className="text-center">
          <h1
            className="text-4xl md:text-5xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-gray-500
           to-black bg-clip-text text-transparent"
          >
            FAQ'S
          </h1>
        </div>
        {/* Accordion Component */}
        <div className="lg:max-w-5xl justify-center mx-auto my-14">
          <Accordion type="single" collapsible className="bg-gray-50 p-10 rounded-lg">
            {/* 1 */}
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-lg">What materials are your chairs and sofas made of?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
              Our chairs and sofas are crafted from premium materials like solid wood, metal, high-density foam, and durable fabrics or leather.
              </AccordionContent>
            </AccordionItem>
            {/* 2 */}
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-lg">Do you offer customizations for chairs and sofas?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
              Yes, we provide customization options for selected models, including fabric, color, and size. Check the product details for availability.
              </AccordionContent>
            </AccordionItem>
            {/* 3 */}
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-lg">Are the cushions removable for cleaning?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
              Most of our chairs and sofas come with removable cushions for easy cleaning. Please refer to the product description for specific details.
              </AccordionContent>
            </AccordionItem>
            {/* 4 */}
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-lg">Do you provide a warranty on your furniture?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
                Yes, we offer a warranty ranging from 1 to 5 years, depending on the product. Warranty details are included in the product listing..
              </AccordionContent>
            </AccordionItem>
            {/* 5 */}
            <AccordionItem value="item-5">
              <AccordionTrigger className=" text-lg">Can I request fabric swatches before purchasing?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
              Absolutely! Fabric swatches can be requested for many of our products to ensure you’re satisfied with the material before ordering.
              </AccordionContent>
            </AccordionItem>
            {/* 6 */}
            <AccordionItem value="item-6">
              <AccordionTrigger className=" text-lg">How do I assemble the furniture after delivery?</AccordionTrigger>
              <AccordionContent className="font-medium text-base text-gray-800">
              Our chairs and sofas typically come pre-assembled. For those requiring assembly, clear instructions and necessary tools are included in the package.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}
