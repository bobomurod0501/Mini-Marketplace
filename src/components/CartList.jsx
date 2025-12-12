import React from 'react'
import { CartItem } from './CartItem'

export const CartList = ({ items, onRemove, onUpdate }) => {

   if(!items.length){
      return (
         <div className='small' style={{marginTop:12}}>
            Savat bo'sh
         </div>
      )
   }

   return(
      <div className='cart-list'>
         {
            items.map((item) => (
               <CartItem
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                  onUpdate={onUpdate}
               />
            ))
         }
      </div>
   )

}
