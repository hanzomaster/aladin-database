import { Address } from "@prisma/client";

function AddressItem({
  address,
  setDefault,
  deleteAddress,
}: {
  address: Address;
  setDefault: (id: string) => void;
  deleteAddress: (id: string) => void;
}) {
  return (
    <div className="my-5 flex justify-between border-b-2 pb-4">
      <div className="flex-[3] lg:flex-[4]">
        <header className="flex ">
          <h1 className="mr-4 text-sm font-semibold sm:text-base">{address.receiver}</h1>
          <p className="border-l-2 pl-1 text-sm sm:text-base">{address.phone}</p>
        </header>
        <main className="mb-1">
          <p className="text-xs sm:text-base">{address.detail}</p>
          <p className="text-xs sm:text-base">
            {`${address.ward}, ${address.district}, ${address.city}`}
          </p>
        </main>

        <span
          className="border-[1px] border-[#da291c] px-[0.1rem] text-[#da291c]"
          hidden={!address.isDefault}>
          Mặc định
        </span>
      </div>

      <div className="flex-1">
        <div className="mb-2 flex w-full flex-col justify-between text-[#0070f3] sm:flex-row ">
          {/* <button className="hover:text-[#0070f3]/80">Cập nhật</button> */}
          <button className="hover:text-[#0070f3]/80" onClick={() => deleteAddress(address.id)}>
            Xóa
          </button>
        </div>

        <button
          className="w-full border-2 p-1 hover:bg-slate-200"
          onClick={() => setDefault(address.id)}
          hidden={address.isDefault}>
          Thiết lập mặc định
        </button>
      </div>
    </div>
  );
}
export default AddressItem;
