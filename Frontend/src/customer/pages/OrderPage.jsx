import OrderCard from "./../components/OrderCard/OrderCard";
const OrderPage = () => {
  const options = [
    {
      id: 1,
      label: "On the way",
      value: "onTheWay",
    },
    {
      id: 2,
      label: "Delivered",
      value: "delivered",
    },
    {
      id: 3,
      label: "Cancelled",
      value: "cancelled",
    },
    {
      id: 4,
      label: "Returned",
      value: "returned",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-10  w-[90%] mx-auto my-[50px] ">
      <div className="flex  basis-[25%]  shadow-lg flex-col mt-3 p-3 max-h-[280px]">
        <h4 className="text-xl font-bold text-gray-900">Filters</h4>
        <div className="mt-4  flex flex-col gap-3">
          <h5 className="font-bold ">Order Status</h5>
          <div className="flex flex-col justify-center gap-3">
            {options.map((item) => (
              <div className="flex flex-row items-center" key={item.id}>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  defaultValue={item.value}
                  id={item.value}
                />
                <label className="ml-2 opacity-70" htmlFor={item.value}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 basis-[75%]">
        {[1, 1, 1, 1, 1].map((item, i) => (
          <OrderCard className="border hover:shadow-2xl" key={i} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
