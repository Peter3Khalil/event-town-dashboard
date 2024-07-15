import { AddCategoryIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useMediaQuery from '@/hooks/useMediaQuery';
import CategoriesApi from '@/services/CategoriesApi';
import { ErrorResponse } from '@/types/global.types';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const CreateCategoryDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('New Category');
  const [error, setError] = useState('');
  const { mutate, isLoading } = useMutation(CategoriesApi.create, {
    onSuccess() {
      queryClient.invalidateQueries('categories');
      setOpen(false);
      setName('New Category');
      setError('');
    },
    onError(error) {
      const err = error as AxiosError<ErrorResponse>;
      setError(err.response?.data.errors[0].msg ?? 'Something went wrong');
    },
  });
  const [isValid, setIsValid] = useState(false);

  const isButtonDisabled = !isValid || isLoading || error.length > 0;

  const validateName = (name: string) => {
    const trimmedName = name.trim();
    return trimmedName.length > 2 && trimmedName.length <= 30;
  };
  const handleSubmit = () => {
    mutate({ title: name });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.slice(0, 30));
  };
  useEffect(() => {
    setIsValid(validateName(name));
    setError('');
  }, [name]);

  const { isMatched: isDesktop } = useMediaQuery({ minWidth: 768 });
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <div className="flex items-center gap-2 text-sm md:text-xs">
              <AddCategoryIcon size={20} />
              <span className="hidden capitalize sm:block">
                Create Category
              </span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
            <DialogDescription>
              Enter name of the category you want to create.
            </DialogDescription>
          </DialogHeader>
          <Form name={name} error={error} handleOnChange={handleOnChange} />
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={isButtonDisabled}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <div className="flex items-center gap-2 text-sm md:text-xs">
            <AddCategoryIcon size={20} />
            <span className="hidden capitalize sm:block">Create Category</span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Category</DrawerTitle>
          <DrawerDescription>
            Enter name of the category you want to create.
          </DrawerDescription>
        </DrawerHeader>
        <Form name={name} error={error} handleOnChange={handleOnChange} />
        <DrawerFooter className="pt-2">
          <Button onClick={handleSubmit} disabled={isButtonDisabled}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

type FormProps = {
  name: string;
  error: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Form: FC<FormProps> = ({ name, error, handleOnChange }) => {
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <div className="flex w-full flex-col gap-1">
        <Input
          id="name"
          defaultValue="New Category"
          onChange={handleOnChange}
          value={name}
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
    </div>
  );
};

export default CreateCategoryDialog;
