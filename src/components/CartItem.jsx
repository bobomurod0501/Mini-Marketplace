import React from 'react'

export const CartItem = ({item, onRemove, onUpdate}) => {
  return (
    <div className='cart-item'>
      <img src={item.image} alt="" />
      <div style={{flex:1}}>
         <div style={{fontSize:"14px", fontWeight:600}}>
            {item.title}
         </div>
         <div className='small'>
            {item.price.toFixed(2)} each
         </div>
      </div>
      <div
      style={{
         display:"flex",
         flexDirection:"column",
         gap:6,
         alignItems:"center"
      }}
      >
         <div style={{display:"flex", gap:6, alignItems:"center"}}>
            <button className='btn btn-muted' onClick={() => onUpdate(item.id, item.qty - 1)}> - </button>
            <div className='qty'>
               {item.qty}
            </div>
            <button className='btn btn-muted' onClick={() => onUpdate(item.id, item.qty + 1)}> + </button>
         </div>
         <div style={{display:"flex", gap:6}}>
            <button className='btn btn-muted' onClick={() => onRemove(item.id)}>
               Remove
            </button>
         </div>
      </div>
    </div>
  )
}
