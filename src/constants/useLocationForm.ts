/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { PATHS } from "./paths";

enum FETCH_TYPES {
  CITIES = "FETCH_CITIES",
  DISTRICTS = "FETCH_DISTRICTS",
  WARDS = "FETCH_WARDS",
}

async function fetchLocationOptions(fetchType: FETCH_TYPES, locationId?: number) {
  let url;
  switch (fetchType) {
    case FETCH_TYPES.CITIES: {
      url = `${PATHS.CITIES}.json`;
      break;
    }
    case FETCH_TYPES.DISTRICTS: {
      url = `${PATHS.DISTRICTS}/${locationId}.json`;
      break;
    }
    case FETCH_TYPES.WARDS: {
      url = `${PATHS.WARDS}/${locationId}.json`;
      break;
    }
    default: {
      return [];
    }
  }
  const locations: Array<{ id: number; name: string }> = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.data);
  return locations.map(({ id, name }) => ({ value: id, label: name }));
}

async function fetchInitialData() {
  const { cityId, districtId, wardId } = await fetch(PATHS.LOCATION).then((res) => res.json());
  const [cities, districts, wards] = await Promise.all([
    fetchLocationOptions(FETCH_TYPES.CITIES),
    fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityId),
    fetchLocationOptions(FETCH_TYPES.WARDS, districtId),
  ]);
  return {
    cityOptions: cities,
    districtOptions: districts,
    wardOptions: wards,
    selectedCity: cities.find((c) => c.value === cityId),
    selectedDistrict: districts.find((d) => d.value === districtId),
    selectedWard: wards.find((w) => w.value === wardId),
  };
}

function useLocationForm(shouldFetchInitialLocation: boolean) {
  const [state, setState] = useState<{
    cityOptions: Array<{ value: number; label: string }>;
    districtOptions: Array<{ value: number; label: string }>;
    wardOptions: Array<{ value: number; label: string }>;
    selectedCity: { value: number; label: string } | undefined;
    selectedDistrict: { value: number; label: string } | undefined;
    selectedWard: { value: number; label: string } | undefined;
  }>({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: undefined,
    selectedDistrict: undefined,
    selectedWard: undefined,
  });

  const { selectedCity, selectedDistrict } = state;

  useEffect(() => {
    (async function () {
      if (shouldFetchInitialLocation) {
        const initialData = await fetchInitialData();
        setState(initialData);
      } else {
        const options = await fetchLocationOptions(FETCH_TYPES.CITIES);
        setState({ ...state, cityOptions: options });
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedCity) return;
      const options = await fetchLocationOptions(FETCH_TYPES.DISTRICTS, selectedCity.value);
      setState({ ...state, districtOptions: options });
    })();
  }, [selectedCity]);

  useEffect(() => {
    (async function () {
      if (!selectedDistrict) return;
      const options = await fetchLocationOptions(FETCH_TYPES.WARDS, selectedDistrict.value);
      setState({ ...state, wardOptions: options });
    })();
  }, [selectedDistrict]);

  function onCitySelect(option: { value: number; label: string }) {
    if (option !== selectedCity) {
      setState({
        ...state,
        districtOptions: [],
        wardOptions: [],
        selectedCity: option,
        selectedDistrict: undefined,
        selectedWard: undefined,
      });
    }
  }

  function onDistrictSelect(option: { value: number; label: string }) {
    if (option !== selectedDistrict) {
      setState({
        ...state,
        wardOptions: [],
        selectedDistrict: option,
        selectedWard: undefined,
      });
    }
  }

  function onWardSelect(option: { value: number; label: string }) {
    setState({ ...state, selectedWard: option });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.location.reload();
  }

  return { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationForm;
