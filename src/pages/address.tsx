import { NextPage } from "next";
import Navbar from "../components/navbar";
import { default as AddressItem } from "../components/user/AddressItem";
import SidebarAccount from "../components/user/SidebarAccount";
import { trpc } from "@utils/trpc";

const AddressView: NextPage = () => {
  const { data } = trpc.user.address.get.useQuery();

  const utils = trpc.useContext();
  const defaultMutation = trpc.user.address.makeDefault.useMutation({
    onSuccess() {
      utils.user.address.get.invalidate();
    },
  });

  const setDefault = (id: string) => {
    defaultMutation.mutate({ id });
  };

  const deleteMutation = trpc.user.address.delete.useMutation({
    onSuccess() {
      utils.user.address.get.invalidate();
    },
  });
  const deleteAddress = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return (
    <div className="h-full w-full text-sm md:text-base ">
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <div className="p- mx-1 py-10">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        <div className="mt-10 flex h-full w-full border-b-4 px-2 sm:px-4 lg:px-10">
          <SidebarAccount />
          {/* main */}
          <div className="w-full lg:w-[70%]">
            <header className="flex h-20 w-full flex-col border-b-2 px-2 sm:flex-row sm:items-center sm:justify-between md:px-5">
              <h1 className="mb-2 text-xl font-normal sm:text-2xl md:text-3xl">Địa chỉ của tôi</h1>
            </header>

            <main className=" pl-10 pr-[5rem]  md:pl-10 lg:pl-32 ">
              <div className="flex flex-col">
                {data?.map((address, index) => (
                  <AddressItem
                    key={index}
                    address={address}
                    // default={selectedIndex === index && true}
                    setDefault={setDefault}
                    deleteAddress={deleteAddress}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};
export default AddressView;
