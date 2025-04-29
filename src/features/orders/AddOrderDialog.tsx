import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import OrderForm from "./OrderForm";
import { ShoppingCart } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
};

const AddOrderDialog = ({ trigger }: Props) => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2 text-lg font-bold">
                <ShoppingCart className="h-5"/>
                Agregar una Nueva Orden
            </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete el formulario para agregar una nueva orden al sistema.
          </DialogDescription>
        </DialogHeader>
        <OrderForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;