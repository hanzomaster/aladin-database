import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ToastProps } from "./type";
import { useToast } from "./useToast";
import {
  animationVariables,
  closeButtonClasses,
  closeIcon,
  getIcon,
  iconClasses,
  wrapperClasses,
} from "./utils";

export const Toast = (props: ToastProps) => {
  // eslint-disable-next-line prefer-const
  let { type = "info", icon = "", message = "---", id, duration = 3000 } = props;
  icon = icon === "" ? getIcon(type) : icon;
  duration = typeof duration === "string" ? +duration : duration;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { remove, position } = useToast();

  //auto dismiss
  const dismissRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        remove(id, wrapperRef);
      }, duration);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(dismissRef.current);
    };
  }, [duration, id, remove]);

  // progressBar
  const progressBarRef = useRef<ReturnType<typeof setInterval>>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const complete = 100;

    if (duration) {
      progressBarRef.current = setInterval(() => {
        if (progress < complete) {
          setProgress((prev) => prev + 1);
        } else {
          return;
        }
      }, duration / complete);
    }

    return () => {
      clearInterval(progressBarRef.current);
    };
  }, [duration, progress]);
  return (
    <div
      style={{ ["--elm-translate" as string]: animationVariables[position] }}
      className={clsx(
        wrapperClasses[type],
        "animate-toastIn",
        "relative my-3 flex items-center justify-between overflow-hidden rounded-md shadow-lg"
      )}
      ref={wrapperRef}
      role={"alert"}>
      {!!duration && (
        <div className="absolute bottom-0 right-0 left-0 h-1 w-full bg-neutral-100 dark:bg-neutral-500">
          <span
            className="absolute left-0 top-0 bottom-0 h-full bg-neutral-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {icon && (
        <div className={clsx(iconClasses[type], "flex p-3")}>
          <div className="inline-flex h-6 w-6 items-center justify-center">
            <span className="sr-only">{type} Icon</span>
            {icon}
          </div>
        </div>
      )}
      <div className="flex-grow p-3 text-sm font-semibold">{message}</div>
      <button
        aria-label="Close"
        onClick={() => {
          remove(id, wrapperRef);
        }}
        className={closeButtonClasses}>
        <span className="sr-only">Close</span>
        {closeIcon}
      </button>
    </div>
  );
};
