import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from '@/components/shared/CustomDialog';
import { AddCategoryIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  return (
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger asChild>
        <Button>
          <div className="flex items-center gap-2 text-sm md:text-xs">
            <AddCategoryIcon size={20} />
            <span className="hidden capitalize sm:block">Create Category</span>
          </div>
        </Button>
      </CustomDialogTrigger>
      <CustomDialogContent className="sm:max-w-[425px]">
        <CustomDialogHeader>
          <CustomDialogTitle>New Category</CustomDialogTitle>
          <CustomDialogDescription>
            Enter name of the category you want to create.
          </CustomDialogDescription>
        </CustomDialogHeader>
        <Form name={name} error={error} handleOnChange={handleOnChange} />
        <CustomDialogFooter>
          <Button onClick={handleSubmit} disabled={isButtonDisabled}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </CustomDialogFooter>
      </CustomDialogContent>
    </CustomDialog>
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
