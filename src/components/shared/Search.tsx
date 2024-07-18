import { CancelIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { GetAllQueryParams } from '@/types/global.types';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
interface SearchProps<T extends GetAllQueryParams>
  extends React.ComponentProps<typeof Input> {
  setParams: Dispatch<SetStateAction<T>>;
}

const Search = <T extends GetAllQueryParams>({
  className,
  setParams,
  ...props
}: SearchProps<T>) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [],
  );
  const clear = useCallback(() => {
    setKeyword('');
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      keyword: keyword.trim(),
      limit: prev.limit,
      page: 1,
    }));
  }, [keyword, setParams]);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded border px-4 md:w-fit',
        {
          'border-primary': isFocused,
        },
      )}
    >
      <Input
        className={cn(
          'w-full border-none p-0 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-0 md:w-[300px]',
          className,
        )}
        placeholder="Search"
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        value={keyword}
        {...props}
      />
      {keyword.length > 0 && (
        <Button
          size={'icon'}
          variant={'ghost'}
          className="size-auto"
          onClick={clear}
        >
          <CancelIcon size={16} />
        </Button>
      )}
    </div>
  );
};

export default Search;
