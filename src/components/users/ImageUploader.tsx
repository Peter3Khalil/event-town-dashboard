import { UploadImageIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import React, { memo, useMemo } from 'react';

type ImageUploaderProps = {
  profileImg: File | null;
  // eslint-disable-next-line no-unused-vars
  setProfileImg: (file: File | null) => void;
};

const ImageUploader = memo(
  ({ profileImg, setProfileImg }: ImageUploaderProps) => {
    const { toast } = useToast();
    const validFileTypes = useMemo(
      () => ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
      [],
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0);
      if (!file) return;

      if (validFileTypes.includes(file.type)) {
        setProfileImg(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Only images are allowed',
        });
      }
    };

    return (
      <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-4 md:w-[80%] lg:w-[50%]">
        {profileImg ? (
          <div className="flex flex-col items-center gap-2 px-6">
            <div className="relative size-28 rounded-full">
              <Image
                src={URL.createObjectURL(profileImg)}
                alt="profile"
                className="absolute left-0 top-0 size-full rounded-[inherit] object-cover"
                width={300}
                height={300}
              />
            </div>
            <Button
              className="w-fit"
              type="button"
              variant={'secondary'}
              onClick={() => {
                setProfileImg(null);
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    );
  },
);

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
