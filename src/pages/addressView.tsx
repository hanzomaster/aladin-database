import { NextPage } from "next";
import { useState } from "react";
import AddressItem from "../components/user/AddressItem";
import SidebarAccount from "../components/user/SidebarAccount";
import { trpc } from "../utils/trpc";

const AddressView: NextPage = () => {
  const { data: addresses } = trpc.user.address.get.useQuery();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addressList, setAddressList] = useState(addresses);

  const handleDeleteAddress = (index: number) => {
    const newAddressList = addresses;
    newAddressList?.splice(index, 1);
    setAddressList(newAddressList);
  };

  return (
    <div className="h-full w-full text-sm md:text-base ">
      <div className="mt-[] flex h-full w-full border-b-4 px-2 sm:px-4 lg:px-10">
        <SidebarAccount />
        {/* main */}
        <div className="w-full lg:w-[70%]">
          <header className="flex h-20 w-full flex-col border-b-2 px-2 sm:flex-row sm:items-center sm:justify-between md:px-5">
            <h1 className="mb-2 text-xl font-normal sm:text-2xl md:text-3xl">Địa chỉ của tôi</h1>
            <button className="flex h-8 w-24 items-center bg-[#da291c] text-xs text-white sm:h-12 sm:text-lg md:w-36">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 sm:h-6 sm:w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              Thêm địa chỉ
            </button>
          </header>

          <main className=" pl-10 pr-[5rem]  md:pl-10 lg:pl-32 ">
            <div className="flex flex-col">
              {addressList?.map((address, index) => (
                <AddressItem
                  key={index}
                  address={address}
                  setDefault={() => setSelectedIndex(index)}
                  deleteAddress={() => handleDeleteAddress(index)}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default AddressView;
