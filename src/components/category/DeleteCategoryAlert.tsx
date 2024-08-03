import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from '@/components/shared/CustomDialog';
import DeleteButton from '@/components/shared/DeleteButton';
import { TrashIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';
import { FC, useState } from 'react';

type DeleteCategoryAlertProps = {
  category: Category;
};

const DeleteCategoryAlert: FC<DeleteCategoryAlertProps> = ({ category }) => {
  const [open, setOpen] = useState(false);
  return (
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger>
        <MyTooltip content="Delete" side="top" delayDuration={500}>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="text-destructive hover:text-destructive"
          >
            <TrashIcon className="size-5" />
          </Button>
        </MyTooltip>
      </CustomDialogTrigger>
      <CustomDialogContent>
        <CustomDialogHeader>
          <CustomDialogTitle>Are you absolutely sure?</CustomDialogTitle>
          <CustomDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </CustomDialogDescription>
        </CustomDialogHeader>
        <CustomDialogFooter>
          <Button variant={'secondary'} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <DeleteButton
            deleteFunction={CategoriesApi.delete}
            model={category}
            onSuccess={() => {
              setOpen(false);
            }}
            invalidateKey="categories"
          >
            Delete
          </DeleteButton>
        </CustomDialogFooter>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default DeleteCategoryAlert;
