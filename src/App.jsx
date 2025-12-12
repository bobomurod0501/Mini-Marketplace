import React, { useEffect, useState } from 'react'
import { CartList } from './components/CartList';
const STORAGE_KEY = "mini_marketplace_cart_v1";

export const App = () => {

  const [items, setItem] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch{
      return []
    }
  })

  useEffect(() => {
    const handler = (e) => {
      const product = e.detail

      addToCart(product)
    }
    window.addEventListener("add-to-cart", handler);
    return () => window.removeEventListener("add-to-cart", handler);
  }, [items])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product){
    console.log(product);

    setItem((prev) => {
      const exist = prev.find((item) => item?.id == product?.id);
      if(exist){
        return prev.map((item) => item.id == product.id ? {...item, qty:item.qty + 1}:item)
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    })
  }

  function removeFromCart(id){
    setItem((prev) => prev.filter((item) => item.id !== id))
  }

  function updateQty(id, qty){
    setItem((prev) => prev.map((item) => (item.id === id ? {...item, qty:Math.max(1, qty)} : item)))
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <div>
      <h2>Cart</h2>
      <div className="small">Products in cart: {items.length}</div>
      <CartList
        items={items}
        onRemove={removeFromCart}
        onUpdate={updateQty}
      />
      <div className='summary'> Total :{total.toFixed(2)}</div>
      <div style={{marginTop:10}}>
        <button className='btn btn-muted' onClick={() => setItem([])}>
          Clear cart
        </button>
      </div>
    </div>
  )
}
