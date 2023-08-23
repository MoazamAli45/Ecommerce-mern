import { useNavigate } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard/CheckoutCard";
import { Button } from "@mui/material";

const CartSection = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/checkout?step=2");
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4 w-[95%] mx-auto  gap-5">
      <div className=" col-span-1 lg:col-span-2 flex flex-col gap-4">
        {[1, 1, 1].map((item, i) => (
          <CheckoutCard key={i} />
        ))}
      </div>
      {/*   Checkout Form Card */}
      <div className="col-span-1 flex flex-col gap-3 border px-4 py-3 max-h-[280px] shadow">
        <h5 className="text-lg font-semibold opacity-60 ">Price Details</h5>
        <div className="flex justify-between">
          <h5 className="text-lg font-bold">Price</h5>
          <h5 className="text-lg font-bold">Rs4567</h5>
        </div>
        <div className="flex justify-between">
          <p className="text-lg ">Discount</p>
          <p className="text-lg text-green-500 font-semibold">-Rs400</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg ">Delivery Charges</p>
          <p className="text-lg text-green-500 font-semibold ">Free</p>
        </div>
        <div className="flex justify-between">
          <h5 className="text-lg font-bold">Total Amount</h5>
          <h5 className="text-lg font-bold">Rs4123</h5>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#974EC3",
            color: "#fff",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#974EC3",
            },
          }}
          onClick={navigateHandler}
        >
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartSection;
