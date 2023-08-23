import img1 from "../../../assets/menskurta/img1.jpeg";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate, useLocation } from "react-router-dom";
const OrderCard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHandler = () => {
    // console.log(location.pathname);
    navigate(`${location.pathname}/${1}`);
  };
  const classes =
    props.className +
    " basis-[75%] flex flex-col space-y-5 gap-5 py-5 md:flex-row justify-between items-center border px-5 shadow-lg hover:pointer";
  return (
    <div className={classes} onClick={navigateHandler}>
      <div className="flex gap-5 items-center">
        {/*  Image */}
        <div className="w-[210px] h-[210px] overflow-hidden">
          <img
            src={img1}
            alt="image"
            className="h-full w-full object-cover object-top-left"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-semibold">Kurta</h5>
          <p className="text-sm text-gray-500">Size: M</p>
          <p className="text-sm text-gray-500">Color: Blue</p>
        </div>
      </div>
      <p className="font-bold text-gray-900 text-xl">Rs 109</p>
      <div className="flex flex-col gap-2">
        {true && (
          <p className="flex gap-3 items-center">
            <AdjustIcon
              sx={{ width: "25px", height: "25px" }}
              className="text-green-500"
            />
            <span className="text-lg text-gray-900 font-bold">
              Expected Delivery On
            </span>
          </p>
        )}
        {false && (
          <p className="text-md text-gray-500">Your item has been delivered</p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
