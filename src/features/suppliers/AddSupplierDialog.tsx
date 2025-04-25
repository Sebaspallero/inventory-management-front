import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import SupplierForm from "./SupplierForm";

type Props = {
  trigger: React.ReactNode;
};

const AddSupplierDialog = ({ trigger }: Props) => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Agregar Nuevo Proveedor</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete el formulario para agregar un nuevo proveedor al sistema.
          </DialogDescription>
        </DialogHeader>
        <SupplierForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;