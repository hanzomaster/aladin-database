import { NextPage } from "next";
import Select from "react-select";
import useLocationForm from "../constants/useLocationForm";

const ChooseLocation: NextPage = () => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } = useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 w-11/12 rounded border-2 bg-gray-100 p-5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div className="flex flex-col gap-5">
        <Select
          name="cityId"
          key={`cityId_${selectedCity?.value}`}
          isDisabled={cityOptions.length === 0}
          options={cityOptions}
          onChange={(option) => {
            if (option)
              onCitySelect({
                value: option.value,
                label: option.label,
              });
          }}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
        />

        <Select
          name="districtId"
          key={`districtId_${selectedDistrict?.value}`}
          isDisabled={districtOptions.length === 0}
          options={districtOptions}
          onChange={(option) => {
            if (option)
              onDistrictSelect({
                value: option.value,
                label: option.label,
              });
          }}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
        />

        <Select
          name="wardId"
          key={`wardId_${selectedWard?.value}`}
          isDisabled={wardOptions.length === 0}
          options={wardOptions}
          placeholder="Phường/Xã"
          onChange={(option) => {
            if (option)
              onWardSelect({
                value: option.value,
                label: option.label,
              });
          }}
          defaultValue={selectedWard}
        />
        <label htmlFor="detail">Địa chỉ chi tiết:</label>
        <input type="text" name="detail" id="detailAdress" />
      </div>

      <button type="submit" className="mt-4 w-full rounded bg-blue-900 p-2 text-white">
        Xác nhận
      </button>
    </form>
    </div>
  );
};

export default ChooseLocation;