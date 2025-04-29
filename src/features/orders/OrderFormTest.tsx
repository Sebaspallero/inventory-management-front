function OrderForm({ order, onClose } : { order?: any, onClose: () => void }) {

    const isEditing = !!order;
    
    // Datos de ejemplo para el formulario
    const mockSuppliers = [
      { id: 1, name: "Samsung Argentina" },
      { id: 2, name: "LG Electronics" },
      { id: 3, name: "Philips" },
      { id: 4, name: "Sony" }
    ];
    
    const mockProducts = [
      { id: 1, name: "Heladera Samsung RT38", price: 359999.00 },
      { id: 2, name: "Microondas Samsung MG402", price: 109999.00 },
      { id: 3, name: "Smart TV LG 43\"", price: 179999.00 },
      { id: 4, name: "Aspiradora Philips FC9729", price: 89999.00 },
      { id: 5, name: "Auriculares Sony WH-1000XM4", price: 129999.00 }
    ];
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {isEditing ? `Editar Orden #${order.id}` : "Nueva Orden"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Proveedor
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={isEditing ? order.supplierId : ""}
                  >
                    <option value="" disabled>Seleccionar proveedor</option>
                    {mockSuppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>  
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha
                  </label>
                  <input 
                    type="datetime-local" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={isEditing ? new Date(order.orderDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Items de la Orden</h3>
                
                <div className="space-y-4">
                  {/* Items existentes (en caso de edición) */}
                  {isEditing && order.items.map((item: any, index: number) => (
                    <div key={index} className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="w-full md:w-5/12">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Producto</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue=""
                        >
                          <option value="" disabled>Seleccionar producto</option>
                          {mockProducts.map(product => (
                            <option 
                              key={product.id} 
                              value={product.id}
                              selected={product.name === item.productName}
                            >
                              {product.name} - ${product.price.toLocaleString('es-ES')}
                            </option>  
                          ))}
                        </select>
                      </div>
                      
                      <div className="w-full md:w-2/12">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Cantidad</label>
                        <input 
                          type="number" 
                          min="1" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={item.quantity}
                        />
                      </div>
                      
                      <div className="w-full md:w-3/12">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Precio Unit.</label>
                        <input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={item.price}
                        />
                      </div>
                      
                      <div className="w-full md:w-1/12 flex items-end justify-center">
                        <button type="button" className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Item nuevo */}
                  <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-dashed border-2 border-gray-300">
                    <div className="w-full md:w-5/12">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Producto</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>Seleccionar producto</option>
                        {mockProducts.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name} - ${product.price.toLocaleString('es-ES')}
                          </option>  
                        ))}
                      </select>
                    </div>
                    
                    <div className="w-full md:w-2/12">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Cantidad</label>
                      <input 
                        type="number" 
                        min="1"
                        defaultValue="1" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    
                    <div className="w-full md:w-3/12">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Precio Unit.</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    
                    <div className="w-full md:w-1/12 flex items-end justify-center">
                      <button type="button" className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {isEditing ? "Actualizar" : "Crear"} Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default OrderForm;