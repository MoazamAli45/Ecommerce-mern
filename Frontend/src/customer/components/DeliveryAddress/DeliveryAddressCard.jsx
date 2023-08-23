import Button from "@mui/material/Button";
const DeliveryAddressCard = (props) => {
  let classBtn;
  if (props.classNameBtn) {
    classBtn = props.classNameBtn;
  } else classBtn = "md:w-[40%] px-4 py-3";

  return (
    <div className="flex flex-col gap-2 py-4 px-3  shadow-md">
      <h5 className="text-lg font-bold text-gray-900">Syed Moazam Ali</h5>
      <p className="text-gray-500">
        House # 123, Street # 123, Block # 123, Karachi, Pakistan
      </p>

      <h5 className="text-lg font-bold text-gray-900">Phone Number</h5>
      <p className="text-gray-500">+92 333 1234567</p>
      <Button
        variant="contained"
        type="submit"
        className={classBtn}
        sx={{
          backgroundColor: "#974EC3",
          color: "#fff",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#974EC3",
          },
        }}
      >
        Deliver Here
      </Button>
    </div>
  );
};

export default DeliveryAddressCard;
