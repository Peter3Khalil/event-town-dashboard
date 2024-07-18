import { Button } from '@/components/ui/button';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';
import { TrashIcon } from '@/components/shared/Icons';
import React, { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import MyTooltip from '@/components/shared/MyTooltip';

type DeleteCategoryButtonProps = {
  category: Category;
};

const DeleteCategoryButton: FC<DeleteCategoryButtonProps> = ({ category }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(CategoriesApi.delete, {
    onSuccess() {
      queryClient.invalidateQueries('categories');
    },
  });

  const handleDelete = () => {
    mutate(category._id);
  };

  return (
    <div>
      <MyTooltip content="Delete" side="top" delayDuration={500}>
        <Button
          variant={'ghost'}
          size={'icon'}
          disabled={isLoading}
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
        >
          <TrashIcon className="size-5" />
        </Button>
      </MyTooltip>
    </div>
  );
};

export default DeleteCategoryButton;
