import { NextPage } from "next";
import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import ColorChooser from "../../components/admin/chooseColorDialog";
import DropDownItem from "../../components/admin/DropDownItem";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { useToast } from "../../components/Toast";
import { trpc } from "../../utils/trpc";
// import { test } from "../utils/test";
const NewProduct: NextPage = () => {
  const [productDetailList, setProductDetailList] = useState<
    { colorCode: string; image: string; numS: number; numM: number; numL: number; numXL: number }[]
  >([]);

  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [selectedGender, setSelectedGender] = useState("Nam");
  const [selectedProductLine, setSelectedProductLine] = useState("Polo");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { add: toast } = useToast();

  const mutation = trpc.product.create.useMutation({
    onSuccess() {
      toast({
        type: "success",
        duration: 1500,
        message: "Tạo sản phẩm thành công",
        position: "topCenter",
      });
      document.getElementsByTagName("form")[0]?.reset();
      setProductDetailList([]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    onError() {
      toast({
        type: "error",
        duration: 1500,
        message: "Tạo sản phẩm thất bại",
        position: "topCenter",
      });
    },
  });
  const handleFileChange = async (file: File, index: number) => {
    const { url } = await uploadToS3(file);
    const tempArr = [...productDetailList];
    tempArr[index]!.image = url;
    setProductDetailList(tempArr);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };
  const onDeleteItem = (idx: number) => {
    setProductDetailList(productDetailList.filter((a, index) => index !== idx));
  };
  const onCreateNewClick = () => {
    const tempArr = [...productDetailList];
    tempArr.push({ colorCode: "", image: "", numS: 0, numM: 0, numL: 0, numXL: 0 });
    setProductDetailList(tempArr);
  };

  const onColorCodeChange = (color: string, index: number) => {
    const tempArr = [...productDetailList];
    if (tempArr[index] !== null) {
      tempArr[index]!.colorCode = color;
    }
    setProductDetailList(tempArr);
  };

  const onNumSChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempArr = [...productDetailList];
    tempArr[index]!.numS = parseInt(e.target.value);
    setProductDetailList(tempArr);
  };
  const onNumMChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempArr = [...productDetailList];
    tempArr[index]!.numM = parseInt(e.target.value);
    setProductDetailList(tempArr);
  };
  const onNumLChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempArr = [...productDetailList];
    tempArr[index]!.numL = parseInt(e.target.value);
    setProductDetailList(tempArr);
  };

  const onNumXLChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempArr = [...productDetailList];
    tempArr[index]!.numXL = parseInt(e.target.value);
    setProductDetailList(tempArr);
  };

  const createProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      gender: selectedGender === "Nam" ? "M" : "F",
      type: selectedProductLine,
      name: name,
      description: description,
      buyPrice: price,
      productDetail: productDetailList,
    });
  };

  return (
    <div className="  p- h-full w-full text-sm md:text-base">
      <NavbarAdmin />
      <form className="w-full px-10 pt-10 pb-3 md:px-28" onSubmit={createProduct}>
        <div className="my-5 flex flex-col lg:w-[60%] lg:flex-row lg:justify-between">
          <div className="flex items-center md:flex-row">
            <label
              className="my-5 mr-10 text-sm font-semibold text-gray-500 md:text-base"
              htmlFor="email">
              Giới tính
            </label>
            <DropDownItem
              title="Gender"
              list={["Nam", "Nữ"]}
              setSelectedGender={setSelectedGender}
              setSelectedLine={setSelectedProductLine}
            />
          </div>

          <div className="flex items-center">
            <label
              className="my-5 mr-10 text-sm font-semibold text-gray-500 md:text-base"
              htmlFor="email">
              Loai sản phẩm
            </label>
            <DropDownItem
              title="ProductLine"
              list={[
                "Coat",
                "Hoodie",
                "Jeans",
                "Pants",
                "Pj",
                "Polo",
                "Shirt",
                "Shorts",
                "Sweater",
                "T-shirt",
              ]}
              setSelectedGender={setSelectedGender}
              setSelectedLine={setSelectedProductLine}
            />
          </div>
        </div>
        <div className="my-5 lg:w-[60%]">
          <label className="my-5 text-sm font-semibold text-gray-500 md:text-base" htmlFor="name">
            Tên sản phẩm
          </label>
          <input
            className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
            type="text"
            onChange={handleNameChange}
            autoFocus
            required
          />
        </div>

        <div className="my-5 lg:w-[60%]">
          <label
            className="my-5 text-sm font-semibold text-gray-500 md:text-base"
            htmlFor="description">
            Mô tả
          </label>
          <textarea
            className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="my-5 lg:w-[60%]">
          <label className="my-5 text-sm font-semibold text-gray-500 md:text-base" htmlFor="email">
            Giá (K)
          </label>
          <input
            className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
            onChange={handlePriceChange}
            type="text"
            required
          />
        </div>

        <div className="my-5">
          <label className="my-5 text-sm font-semibold text-gray-500 md:text-base" htmlFor="email">
            Chi tiết
          </label>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div>
                    <table className="w-full">
                      <thead className="border-b bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            Mã màu
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            Ảnh
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            S
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            M
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            L
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-left text-base font-medium text-gray-900">
                            XL
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetailList.map((item, index) => (
                          <tr
                            className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                            key={index}>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <ColorChooser index={index} onColorCodeChange={onColorCodeChange} />
                              <span
                                style={{
                                  background: `#${item.colorCode}`,
                                }}>
                                #{item.colorCode}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <FileInput
                                onChange={(file: File) => {
                                  handleFileChange(file, index);
                                }}
                              />
                              <div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openFileDialog();
                                  }}>
                                  Chọn ảnh
                                </button>
                                <div className=" relative h-36 w-20 overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.image}
                                    className="overflow-hidden"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <input
                                className="h-8 w-16 rounded-sm bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-white "
                                type="number"
                                name="s"
                                value={item.numS}
                                onChange={onNumSChange(index)}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <input
                                className="h-8 w-16 rounded-sm bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-white "
                                type="number"
                                name="m"
                                value={item.numM}
                                onChange={onNumMChange(index)}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <input
                                className="h-8 w-16 rounded-sm bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-white "
                                type="number"
                                name="l"
                                value={item.numL}
                                onChange={onNumLChange(index)}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <input
                                className="h-8 w-16 rounded-sm bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-white  "
                                type="number"
                                name="xl"
                                value={item.numXL}
                                onChange={onNumXLChange(index)}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-base font-light text-gray-900">
                              <button
                                className="btn btn-outline-danger btn-sm rounded-sm bg-red-500"
                                onClick={() => onDeleteItem(index)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="white"
                                  className="h-5 w-5">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onCreateNewClick();
                      }}
                      className="btn btn-primary mt-3 flex text-gray-900 hover:text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="ml-2 text-base font-medium ">Thêm màu</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={productDetailList.length === 0}
          className="relative mr-0 h-full w-36 rounded-lg bg-gray-100 hover:bg-gray-700 hover:text-white">
          {" "}
          Tạo sản phẩm
        </button>
      </form>
    </div>
  );
};
export default NewProduct;
