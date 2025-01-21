"use client";
import { useRef, useState } from "react";

export default function AddressForm() {
    // Refs to store form input values
    const getName = useRef<HTMLInputElement>(null);
    const getPhone = useRef<HTMLInputElement>(null);
    const getAd1 = useRef<HTMLInputElement>(null);
    const getAd2 = useRef<HTMLInputElement>(null);
    const getCity = useRef<HTMLInputElement>(null);
    const getProvince = useRef<HTMLInputElement>(null);
    const getPostalCode = useRef<HTMLInputElement>(null);
    const getCountry = useRef<HTMLInputElement>(null);
    const getAddressResidentialIndicator = useRef<HTMLSelectElement>(null);

    // State to store shipment details
    const [shipmentDetails, setShipmentDetails] = useState<any>(null);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Prepare payload for the API
        const payload = {
            shipToAddress: {
                name: getName.current?.value,
                phone: getPhone.current?.value,
                addressLine1: getAd1.current?.value,
                addressLine2: getAd2.current?.value,
                cityLocality: getCity.current?.value,
                stateProvince: getProvince.current?.value,
                postalCode: getPostalCode.current?.value,
                countryCode: getCountry.current?.value,
                addressResidentialIndicator: getAddressResidentialIndicator.current?.value,
            },
            packages: [
                {
                    weight: { value: 5, unit: "ounce" }, // 👈 Change weight as needed
                    dimensions: { height: 3, width: 15, length: 10, unit: "inch" }, // 👈 Change dimensions as needed
                },
            ],
        };

        try {
            // Send payload to the API
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/shipengine";
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            // Save the response to state
            const data = await res.json();
            setShipmentDetails(data);
        } catch (error) {
            console.log("Error");
        }
    };

    return (
        <div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" ref={getName} placeholder="John Doe" />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" ref={getPhone} placeholder="+1 555 987 6543" />
                </div>

                {/* Address Line 1 */}
                <div>
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input type="text" id="addressLine1" ref={getAd1} placeholder="456 Oak Avenue" />
                </div>

                {/* Address Line 2 */}
                <div>
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <input type="text" id="addressLine2" ref={getAd2} placeholder="Suite 200" />
                </div>

                {/* City/Locality */}
                <div>
                    <label htmlFor="cityLocality">City/Locality</label>
                    <input type="text" id="cityLocality" ref={getCity} placeholder="Los Angeles" />
                </div>

                {/* State/Province */}
                <div>
                    <label htmlFor="stateProvince">State/Province</label>
                    <input type="text" id="stateProvince" ref={getProvince} placeholder="CA" />
                </div>

                {/* Postal Code */}
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" ref={getPostalCode} placeholder="90001" />
                </div>

                {/* Country Code */}
                <div>
                    <label htmlFor="countryCode">Country Code</label>
                    <input type="text" id="countryCode" ref={getCountry} placeholder="US" />
                </div>

                {/* Address Residential Indicator */}
                <div>
                    <label htmlFor="addressResidentialIndicator">Residential Address?</label>
                    <select id="addressResidentialIndicator" ref={getAddressResidentialIndicator}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>

            {/* Display Shipment Details */}
            {shipmentDetails && (
                <div>
                    <h2>Shipment Details</h2>
                    <pre>{JSON.stringify(shipmentDetails, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}