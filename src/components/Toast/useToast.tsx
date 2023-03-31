import clsx from "clsx";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Toast } from "./Toast";
import { ToastContextType, ToastPositionType, ToastProps } from "./type";
import { positionClasses } from "./utils";

const ToastContext = createContext<ToastContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  add: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
  position: "topRight",
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [position, setPosition] = useState<ToastPositionType>("topRight");

  const add = (toast: Omit<ToastProps, "id">) => {
    //first check for position
    if (toast.position && toast.position !== position) {
      setPosition(toast.position);
    }

    // add it to the list
    setToasts((toasts) => [...toasts, { ...toast, id: Math.random() * 10000 }]);
  };

  const remove = (toastId: number) => {
    // ref?.current?.classList.add("animate-toastOut");

    // //remove element after animation is done
    // ref?.current?.addEventListener("animationend", () => {
    // lets remove it
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
    // });
  };

  return (
    <div className="">
      <ToastContext.Provider value={{ add, remove, position }}>
        {children}
        {/* toast list */}
        <div className={clsx(positionClasses[position], "fixed z-50 w-screen max-w-xs")}>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </ToastContext.Provider>
    </div>
  );
};
