import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorChooser = ({ onColorCodeChange, index }: { onColorCodeChange: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useColor("hex", "#121212");

  function closeModal() {
    onColorCodeChange(color.hex.replace("#", ""), index);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <button className="text-[#0070f3] hover:text-[#0070f3]/80" onClick={openModal}>
        Chọn màu
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
                  <Dialog.Title
                    as="h3"
                    className="pb-4 text-lg font-medium leading-6 text-gray-900">
                    Chọn màu
                  </Dialog.Title>

                  <div>
                    <ColorPicker
                      width={400}
                      height={128}
                      color={color}
                      onChange={setColor}
                      hideHSV
                      dark
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={closeModal}>
                      OK
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
export default ColorChooser;
