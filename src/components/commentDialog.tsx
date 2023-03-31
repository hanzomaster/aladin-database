import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { trpc } from "../utils/trpc";
import { useToast } from "./Toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Comment = ({
  productDetailId,
  productName,
  isDisable,
}: {
  productDetailId: string;
  productName: string;
  isDisable: boolean;
}) => {
  // console.log(productDetail[0].productCode);
  // console.log(productCode);
  const { add: toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [starRate, setStarRate] = useState(0);

  const [comment, setComment] = useState("");
  const mutation = trpc.user.comment.create.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 1500,
        message: "Gửi đánh giá thành công!",
        position: "topCenter",
      });
      setIsOpen(false);
    },
  });
  function closeModal() {
    mutation.mutate({ dto: { productId: productDetailId, content: comment, rating: starRate } });
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <button
        className="text-[#0070f3] hover:text-[#0070f3]/80"
        onClick={openModal}
        disabled={false}>
        Đánh giá
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Đánh giá sản phẩm {productName}
                  </Dialog.Title>

                  <div>
                    <h1>Rate:</h1>
                    <div className="flex items-center">
                      {Array.from([1, 2, 3, 4, 5]).map((star) => {
                        return (
                          <>
                            <svg
                              aria-hidden="true"
                              className={classNames(
                                star > starRate ? "text-gray-300" : "text-yellow-400",
                                "h-5 w-5"
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              onClick={() => {
                                setStarRate(star);
                              }}
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <h1>Comment:</h1>
                  <textarea
                    className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="mt-4 flex w-full items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={closeModal}>
                      Gửi đánh giá
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={() => {
                        setIsOpen(false);
                      }}>
                      Hủy
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default Comment;
