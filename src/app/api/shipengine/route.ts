import { shipEngine } from "@/helper/shipEngine";
import { NextRequest } from "next/server";

export async function GET() {
   return new Response(JSON.stringify({ message: "Shipengine Testing" }));
}

export async function POST(request: NextRequest) {
   const { shipToAddress, packages } = await request.json();
   try {
      const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
         shipment: {
            shipTo: shipToAddress,
            shipFrom: {
               name: "Umar Farooq",
               phone: "+923312499496",
               addressLine1: "123 Karachi",
               addressLine2: "123 Karachi",
               cityLocality: "karachi",
               stateProvince: "IL",
               postalCode: "12345",
               countryCode: "PK",
               addressResidentialIndicator: "no",
            },
            packages: packages,
         },
         rateOptions: {
            carrierIds: [
               process.env.SHIPENGINE_FIRST_COURIER || "",
               process.env.SHIPENGINE_SECOND_COURIER || "",
               process.env.SHIPENGINE_THIRD_COURIER || "",
               process.env.SHIPENGINE_FOURTH_COURIER || "",
            ].filter(Boolean),
         },
      });

      return new Response(JSON.stringify(shipmentDetails), { status: 200 });
   } catch {
      return new Response(JSON.stringify({ error: "Error Occured!" }), { status: 500 });
   }
}
