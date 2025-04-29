import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import CategoryForm from "./CategoryForm";

type Props = {
  trigger: React.ReactNode;
};

const AddCategoryDialog = ({ trigger }: Props) => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Agregar Nueva Categoria</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete el formulario para agregar una nueva categoria al sistema.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;