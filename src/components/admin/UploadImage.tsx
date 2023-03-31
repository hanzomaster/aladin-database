import { useRef, useState } from "react";

const CardProfile = () => {
  const fileUploader = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(null);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e) {
      setImage(e.target?.result);
    };
  };
  return (
    <div>
      <input
        id="js-file-uploader"
        ref={fileUploader}
        name="profile-picture"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImage}
      />

      <img src={image ? image : ""} alt="Hahahahaha" className="h-full w-full" />
    </div>
  );
};

export default CardProfile;
