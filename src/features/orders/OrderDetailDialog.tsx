import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { IOrderResponse } from "@/types/IOrder";
import { formatDateToLocalInput } from "@/utils/formatDateToLocalInpput";
import { calculateOrderTotal } from "@/utils/calculateOrderTotal";
import { useExportOrderPDF } from "@/hooks/useOrders";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  trigger: React.ReactNode;
  orderDetails: IOrderResponse;
};

const OrderDetailDialog = ({ trigger, orderDetails }: Props) => {

  const [open, setOpen] = useState(false);

  const { mutate: exportExcel, isPending} = useExportOrderPDF();


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Detalles de la Orden #{orderDetails.id}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Aquí puedes ver los detalles de la orden seleccionada.
          </DialogDescription>
        </DialogHeader>
            <div className="p-0">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Número de Orden</h3>
                  <p className="text-base">{orderDetails.orderNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha</h3>
                  <p className="text-base">{formatDateToLocalInput(new Date(orderDetails.orderDate))}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Proveedor</h3>
                  <p className="text-base">{orderDetails.supplierName} (ID: {orderDetails.supplierId})</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Estado</h3>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completada
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">Items de la Orden</h3>
              <div className="overflow-y-auto max-h-48">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="px-4 py-3 text-left text-sm font-medium">Producto</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Cantidad</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Precio Unit.</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.items.map((item: any) => (
                      <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-3 text-sm">{item.productName}</td>
                        <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          ${item.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium">
                          ${(item.price * item.quantity).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 dark:bg-gray-600">
                      <td colSpan={3} className="px-4 py-3 text-right font-bold">Total:</td>
                      <td className="px-4 py-3 text-right font-bold">
                        ${calculateOrderTotal(orderDetails.items).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <Button variant={"outline"} onClick={()=> setOpen(false)}>Cancelar</Button>
                <Button onClick={()=> exportExcel(orderDetails.id)} disabled={isPending} >
                  <FileText className="mr-2" size={16} />
                  Descargar PDF
                </Button>
              </div>
            </div>
      </DialogContent>
    </Dialog>
  );

}

export default OrderDetailDialog;