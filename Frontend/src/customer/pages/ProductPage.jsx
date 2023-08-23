import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ViewListIcon from "@mui/icons-material/ViewList";
import { mensKurta } from "../Data/mensKurta";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductListCard from "../components/ProductCard/ProductListCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "small", label: "S", checked: false },
      { value: "medium", label: "M", checked: false },
      { value: "large", label: "L", checked: false },
    ],
  },
];
const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      {
        value: "159 to 399",
        label: "Rs159 to Rs399",
        checked: false,
      },

      {
        value: "399 to 999",
        label: "Rs399 to Rs999",
        checked: false,
      },
      {
        value: "999 to 1999",
        label: "Rs159 to Rs399",
        checked: false,
      },
      {
        value: "1999 to 2999",
        label: "Rs1999 to Rs2999",
        checked: false,
      },
      {
        value: "2999 to 3999",
        label: "Rs2999 to Rs3999",
        checked: false,
      },
      {
        value: "3999 to 4999",
        label: "Rs3999 to Rs4999",
        checked: false,
      },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      {
        value: "above 10%",
        label: "10% And Above",
        checked: false,
      },

      {
        value: "above 20%",
        label: "20% And Above",
        checked: false,
      },

      {
        value: "above 30%",
        label: "30% And Above",
        checked: false,
      },

      {
        value: "above 40%",
        label: "40% And Above",
        checked: false,
      },

      {
        value: "above 50%",
        label: "50% And Above",
        checked: false,
      },

      {
        value: "above 60%",
        label: "60% And Above",
        checked: false,
      },

      {
        value: "above 70%",
        label: "70% And Above",
        checked: false,
      },
      {
        value: "above 80%",
        label: "80% And Above",
        checked: false,
      },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      {
        value: "in-stock",
        label: "In Stock",
        checked: false,
      },
      {
        value: "out-of-stock",
        label: "Out of  Stock",
        checked: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const navigate = useNavigate();

  // ADDING CHECKBOX QUERY ON URL
  const filterHandler = (sectionId, value) => {
    // console.log(sectionId, value);
    const searchParams = new URLSearchParams(window.location.search);
    let filterValue = searchParams.getAll(sectionId);
    // console.log(filterValue);

    // if condition  we uncheck the checkbox then it will remove the value from the array
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((val) => val !== value);
      // console.log("AFter Index", filterValue);

      //    if length is 0 then delete the sectionId
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    }
    //   when we check the box then add value
    else {
      filterValue.push(value);
    }

    // now we have to add query
    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }

    // now we have to add query
    const query = searchParams.toString();
    // console.log(query);
    navigate({ search: `?${query}` });
  };

  // NOW for radio buttons
  const singleFilterHandler = (sectionId, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(sectionId, value);

    // console.log(searchParams);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const toggleGridViewHandler = () => {
    setGridView(!gridView);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Products
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div>
                    <h3 className="text-base font-medium text-gray-800 m-3">
                      Filters
                    </h3>
                    <form className=" border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() =>
                                          filterHandler(
                                            section.id,
                                            option.value
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      {singleFilters.map((section) => (
                        //  Radio buttons for mobile
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  <div className="flex items-center">
                                    <FormControl
                                      sx={{
                                        fontSize: "14px",
                                        fontFamily: "ui-sans-serif",
                                      }}
                                    >
                                      <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                      >
                                        {section.options.map(
                                          (option, index) => (
                                            <FormControlLabel
                                              key={index}
                                              value={option.value}
                                              control={<Radio />}
                                              label={option.label}
                                              sx={{
                                                fontSize: "14px",
                                                fontFamily: "ui-sans-serif",
                                              }}
                                              onChange={() =>
                                                singleFilterHandler(
                                                  section.id,
                                                  option.value
                                                )
                                              }
                                            />
                                          )
                                        )}
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Product
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                onClick={toggleGridViewHandler}
              >
                <span className="sr-only">View grid</span>
                {!gridView ? (
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ViewListIcon className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <div>
                <h3 className="hidden lg:block text-lg font-bold text-gray-900 my-5">
                  Filters
                </h3>
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    // defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() =>
                                      filterHandler(section.id, option.value)
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilters.map((section) => (
                    //      Radio Buttons FROM MUI

                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              {/* </FormLabel> */}

                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <FormControl
                                  sx={{
                                    fontSize: "14px",
                                    fontFamily: "ui-sans-serif",
                                    color: "#374151",
                                  }}
                                >
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                  >
                                    {section.options.map((option, index) => (
                                      <FormControlLabel
                                        key={index}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                        sx={{
                                          fontSize: "14px",
                                          fontFamily: "ui-sans-serif",
                                        }}
                                        onChange={() =>
                                          singleFilterHandler(
                                            section.id,
                                            option.value
                                          )
                                        }
                                      />
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              {gridView ? (
                <div className="lg:col-span-4    grid justify-items-center md:justify-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {mensKurta.map((product, i) => {
                    return (
                      <ProductCard
                        key={i}
                        image={product.imageLink}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        discount={product.discount}
                        id={i}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="lg:col-span-4    grid grid-cols-1 gap-3">
                  {mensKurta.map((product, i) => {
                    return (
                      <ProductListCard
                        key={i}
                        image={product.imageLink}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        discount={product.discount}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
