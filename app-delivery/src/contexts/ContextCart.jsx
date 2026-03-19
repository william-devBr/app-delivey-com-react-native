import {createContext, useState} from 'react';

const CartContext = createContext();

function CartProvider({children}){
    
   const [cart, setCart] = useState([]);/** inicia o carrinho vazio */
   const [ownerCart, setOwner] = useState(null);

   const [taxaEntrega, setTaxaEntrega]= useState(0.00); // type float

   const addItem = (product, restaurante_id) => {

      setCart((prev) => {
        //** verifica se existe o item já foi adicionado */
        const exists = prev.find(
          (p) => p.product.produto_id === product.produto_id
        );
      /** se existir, muda a quantidade e valor */
        if (exists) {
        return prev.map((p) =>
        
          p.product.produto_id === product.produto_id
            ? {
                ...p,
                product : {
                  ...p.product,
                  quantidade :  product.quantidade,
                  valorItem : product.valorItem,
                  totalItem : parseFloat(p.product.valorItem) * parseInt(p.product.quantidade)
                }
              
              }
            : p
        );
      }
    /** se não existir cria um novo */
        return [
          ...prev,
          { product },
        ];
      });

      setOwner({restaurante_id, taxaEntrega});
   };

  const removeItem = (item)=> {
      const itens = cart.filter(i => !i.id === item.id);
      setCart(itens);
  }

  const clearCart = ()=> {
     setCart([]);
  }

    return (
        <CartContext.Provider value={{cart, addItem, removeItem, taxaEntrega, setTaxaEntrega,ownerCart, setOwner, clearCart}}>
          {children}
        </CartContext.Provider>
    )
}

export {CartProvider, CartContext}


