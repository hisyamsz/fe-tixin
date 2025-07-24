import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface InputFileProps {
  className?: string;
  isDropable?: boolean;
  name: string;
}

const InputFile: FC<InputFileProps> = ({
  className,
  isDropable = false,
  name,
}) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files?.[0] || null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropzoneId}`}
      className={cn(
        "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200",
        className,
      )}
    >
      {uploadedImage ? (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="mb-2 w-1/2">
            <Image
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              fill
              className="!relative"
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            {uploadedImage.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-center text-sm text-gray-500">
            {isDropable
              ? "Drag and drop or click to upload file"
              : "Click to upload file here"}
          </p>
        </div>
      )}
      <input
        type="file"
        name={name}
        accept="image/*"
        id={`dropzone-file-${dropzoneId}`}
        className="hidden"
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;
