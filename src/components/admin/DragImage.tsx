import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const DragImage = (props: any) => {
  const { name, mode = "update" } = props;

  const { register, unregister, setValue, watch } = useForm();

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles: any) => {
      const newFiles = mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  console.log(files?.length);
  return (
    <div className="w-24">
      <div {...getRootProps()}>
        <input
          {...props}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id={name}
          {...getInputProps()}
        />

        <div className="w-full  border-gray-900">
          {!files?.length && (
            <button className=" border-slate-200 px-1 text-center font-normal text-[#0070f3] hover:text-[#0070f3]/80">
              Choose
            </button>
          )}

          {!!files?.length && (
            <div className="mt-2">
              {files.map((file: File) => {
                return (
                  <div key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragImage;
