import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomePage from "@/app/(store)/home/MainHome"
import AddressForm from "@/components/Form";

export default function Home() {
  return (
    <>
    <Header />
    <HomePage />
    <AddressForm />
    <Footer />
    </>
  );
}
