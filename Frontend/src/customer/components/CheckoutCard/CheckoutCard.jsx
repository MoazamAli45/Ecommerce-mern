import image1 from "../../../assets/menskurta/img1.jpeg";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
const CheckoutCard = () => {
  const classDescription = "text-gray-500 text-lg font-semibold opacity-60";
  return (
    <div className="shadow-lg flex gap-3 flex-col   border px-6 py-4">
      <div className="flex flex-col  sm:flex-row gap-6 flex-wrap">
        {/*  Image */}
        <div className="w-[10rem] h-[10rem] self-center">
          <img
            src={image1}
            alt="image"
            className="object-cover h-full w-full object-top-left"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <h4 className="text-lg font-bold text-gray-900 ">
            Men Shoes Mid Range Level
          </h4>
          <p className={classDescription}>Size:L White</p>
          <p className={classDescription}>Seller : Syed Moazam Ali</p>

          {/*  Price */}
          <div className="flex items-center gap-4 ">
            <p className="font-semibold ">Rs 200</p>
            <p className="opacity-50 line-through">Rs 800</p>
            <p className="font-bold text-green-600 ">10% off</p>
          </div>
        </div>
      </div>

      <div className="flex gap-7">
        <div className="flex items-center gap-3 my-2">
          <RemoveCircleOutlineIcon className="text-2xl text-gray-500 cursor-pointer" />
          <span className="border px-5 py-1">4</span>
          <AddCircleOutlineIcon className="text-2xl text-purple-500 cursor-pointer" />
        </div>
        <Button className=" mt-15  text-purple-500">Remove</Button>
      </div>
    </div>
  );
};

export default CheckoutCard;
