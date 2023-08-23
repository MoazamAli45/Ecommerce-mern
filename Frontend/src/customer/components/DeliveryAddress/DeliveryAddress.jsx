import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DeliveryAddressCard from "./DeliveryAddressCard";
import { useRef } from "react";

const DeliveryAddress = (props) => {
  // For Empty the form
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const phoneNumberRef = useRef();

  // const navigate = useNavigate();

  //   console.log("DeliveryAddress");
  const navigateHandler = () => {
    // navigate(`?step = 3`);

    //  Passing Data to Parent
    props.onNavigate(3);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler");
    const formdata = new FormData(e.currentTarget);
    //           FOR GETTING DATA
    const data = {
      firstName: formdata.get("firstName"),
      lastName: formdata.get("lastName"),
      Address: formdata.get("address"),
      City: formdata.get("city"),
      state: formdata.get("state/province/region"),
      PostalCode: formdata.get("postalCode"),
      PhoneNumber: formdata.get("phoneNumber"),
    };
    // Empty the form
    // console.log(firstNameRef.current.value);
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    addressRef.current.value = "";
    cityRef.current.value = "";
    stateRef.current.value = "";
    postalCodeRef.current.value = "";
    phoneNumberRef.current.value = "";

    console.log(data);
    navigateHandler();
  };
  return (
    <div className="flex gap-5 flex-wrap   p-4 ">
      <div className="h-[30rem] md:basis-[40%] overflow-y-auto shadow-lg p-3 flex flex-col gap-4">
        {/*  Delivery Address Card */}
        <DeliveryAddressCard />
        <DeliveryAddressCard />
      </div>
      <form
        className=" grow p-5 shadow-lg flex flex-col gap-y-5"
        onSubmit={submitHandler}
      >
        <h3 className="text-xl font-bold text-gray-900">
          Personal Information
        </h3>
        <div className="flex  gap-4">
          <TextField
            required
            id="firstName"
            label="First Name"
            name="firstName"
            fullWidth
            autoComplete="given"
            inputRef={firstNameRef}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            name="lastName"
            fullWidth
            autoComplete="given"
            inputRef={lastNameRef}
          />
        </div>
        <TextField
          required
          id="Address"
          label="Address"
          name="address"
          fullWidth
          autoComplete="given"
          multiline
          rows={5}
          inputRef={addressRef}
        />
        <div className="flex  gap-4">
          <TextField
            required
            id="City"
            label="City"
            name="city"
            fullWidth
            autoComplete="given"
            inputRef={cityRef}
          />
          <TextField
            required
            id="state"
            label="State/Province/Region"
            name="state/province/region"
            fullWidth
            autoComplete="given"
            inputRef={stateRef}
          />
        </div>
        <div className="flex  gap-4">
          <TextField
            required
            id="Postal Code"
            label="Postal Code"
            name="postalCode"
            fullWidth
            autoComplete="given"
            inputRef={postalCodeRef}
          />
          <TextField
            required
            id="Phone Number"
            label="Phone Number"
            name=" phoneNumber"
            fullWidth
            autoComplete="given"
            inputRef={phoneNumberRef}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          className="md:w-[30%] px-4 py-3"
          sx={{
            backgroundColor: "#974EC3",
            color: "#fff",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#974EC3",
            },
          }}
          // onClick={navigateHandler}
        >
          Deliver Here
        </Button>
      </form>
    </div>
  );
};

export default DeliveryAddress;
