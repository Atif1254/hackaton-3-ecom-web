"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  // Initialize React Hook Form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  // Submit handler
  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <section className="px-6 py-12 bg-gray-50 mt-[100px] mb-[100px]">
      {/* Header */}
      <div className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Get In Touch With Us
        </h2>
        <p className="mt-2 text-gray-400">
          For More Information About Our Products & Services, Please Feel Free
          To Drop Us <br />
          An Email. Our Staff Is Always Here To Help You Out. Do Not Hesitate!
        </p>
      </div>

      {/* Content */}
      <div className="md:flex md:justify-center gap-[220px]">
        {/* Contact Information */}
        <div className="mb-8 md:mb-0">
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <Image src="/vector-1.png" alt="Address" width={20} height={20} />
              <div>
                <h3 className="text-lg font-medium text-gray-800">Address</h3>
                <p>
                  236 5th SE Avenue, New <br />
                  York NY10000, United States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Image src="/vector-2.png" alt="Phone" width={20} height={20} />
              <div>
                <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-8789</p>
              </div>
            </div>

            {/* Working Time */}
            <div className="flex items-start gap-4">
              <Image
                src="/vector-3.png"
                alt="Working Time"
                width={20}
                height={20}
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Working Time
                </h3>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Your Message"
                      {...field}
                      className="w-full border rounded-lg p-2"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-[#029fae] text-white py-2 rounded-lg transition"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Features */}
      <div className="mt-12 h-[250px] items-center flex justify-around bg-gray-100 py-6 shadow-md">
        <div className="text-left gap-3 flex">
          <Image
            src="/trophy-1.png"
            alt="High Quality"
            width={60}
            height={60}
          />
          <div>
            <p className="mt-2 text-gray-800 font-semibold">High Quality</p>
            <p className="text-gray-500">Crafted from top materials</p>
          </div>
        </div>
        <div className="text-left gap-3 flex">
          <Image
            src="/guarantee.png"
            alt="Warranty Protection"
            width={60}
            height={60}
          />
          <div>
            <p className="mt-2 text-gray-800 font-semibold">
              Warranty Protection
            </p>
            <p className="text-gray-500">Over 2 years</p>
          </div>
        </div>
        <div className="text-left gap-3 flex">
          <Image
            src="/customer-support.png"
            alt="24/7 Support"
            width={60}
            height={60}
          />
          <div>
            <p className="mt-2 text-gray-800 font-semibold">24/7 Support</p>
            <p className="text-gray-500">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
