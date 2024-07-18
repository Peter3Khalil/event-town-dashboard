import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react';
type SpecificImageProps = Required<
  Pick<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>
>;
interface MyImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SpecificImageProps {}

const MyImage: FC<MyImageProps> = (props) => {
  const { className, alt, src, width, height, ...rest } = props;
  return (
    <div
      className={cn('relative size-[50px] shrink-0 rounded-full', className)}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute bottom-0 left-0 right-0 top-0 size-full rounded-[inherit] object-cover"
      />
    </div>
  );
};

export default MyImage;
