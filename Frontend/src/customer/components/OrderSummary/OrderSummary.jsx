import DeliveryAddressCard from "./../DeliveryAddress/DeliveryAddressCard";
import CartSection from "./../../Sections/CartSection";

const OrderSummary = () => {
  return (
    <>
      <DeliveryAddressCard classNameBtn="md:w-[25%] px-4 py-3" />
      <CartSection />
    </>
  );
};

export default OrderSummary;
