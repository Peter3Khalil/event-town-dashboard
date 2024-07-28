import { UploadImageIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ImageUploaderContextType = {
  image: File | null | string;
  // eslint-disable-next-line no-unused-vars
  setImage: (file: File | null | string) => void;
};

const ImageUploaderContext = createContext<ImageUploaderContextType | null>(
  null,
);

const ImageUploaderProvider = ({
  children,
  onImageChange,
  value = null,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onImageChange: (image: File | null | string) => void;
  value: File | null | string;
}) => {
  const [image, setImage] = useState<File | null | string>(null);

  useEffect(() => {
    setImage(value);
  }, [value]);

  useEffect(() => {
    if (onImageChange) {
      onImageChange(image);
    }
  }, [image, onImageChange]);

  return (
    <ImageUploaderContext.Provider value={{ image, setImage }}>
      <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-4 md:w-[80%] lg:w-[50%]">
        {children}
      </div>
    </ImageUploaderContext.Provider>
  );
};

const useImageUploader = () => {
  const context = useContext(ImageUploaderContext);

  if (!context) {
    throw new Error(
      'useImageUploader must be used within a ImageUploaderProvider',
    );
  }

  return context;
};

const ImageUploader = () => {
  const { setImage, image } = useImageUploader();
  const { toast } = useToast();
  const validFileTypes = useMemo(
    () => ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
    [],
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0);
      if (!file) return;

      if (validFileTypes.includes(file.type)) {
        setImage(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Only images are allowed',
        });
      }
    },
    [setImage, toast, validFileTypes],
  );

  if (image) return null;

  return (
    <Label
      htmlFor="image"
      className="flex cursor-pointer flex-col items-center text-primary"
    >
      <UploadImageIcon size={50} className="mb-2" />
      <p>Upload Image</p>
      <Input
        id="image"
        type="file"
        accept=".png,.webp,.jpg,.jpeg"
        className="hidden"
        onChange={handleImageChange}
      />
    </Label>
  );
};

const ImagePreview = () => {
  const { image, setImage } = useImageUploader();
  const imageUrl =
    typeof image === 'string'
      ? image
      : image
        ? URL.createObjectURL(image)
        : null;

  useEffect(() => {
    return () => {
      if (typeof image !== 'string' && imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [image, imageUrl]);

  if (!image) return null;

  return (
    <div className="flex flex-col items-center gap-2 px-6">
      <figure className="relative size-28 rounded-full">
        <Image
          src={imageUrl || ''}
          alt="profile"
          className="absolute left-0 top-0 size-full rounded-[inherit] object-cover"
          width={300}
          height={300}
        />
      </figure>
      <Button
        className="w-fit"
        type="button"
        variant={'secondary'}
        onClick={() => {
          setImage(null);
        }}
      >
        Remove
      </Button>
    </div>
  );
};

export { ImageUploader, ImageUploaderProvider, ImagePreview };
