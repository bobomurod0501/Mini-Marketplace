const API = "https://fakestoreapi.com/products";
const grid = document.getElementById("products-grid");

async function fetchProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderProducts(data)
  } catch (error) {
    grid.innerHTML = '<p class="small">Mahsulotlarni yuklashda xatolik.</p>';
    console.log(error);

  }
}

function renderProducts(products){
   grid.innerHTML = ""
   products.forEach((item) => {
      const card = document.createElement("div")
      card.classList = "product-card"
      card.innerHTML = `
         <img src="${item.image}"/>
         <div class="product-title">${escapeHtml(item.title)}</div>
         <div class="product-price">$${escapeHtml(item.price.toFixed(2))}</div>
         <button class="btn add-btn"> Add to cart</button>

      `;
      const btn = card.querySelector(".add-btn")
      btn.addEventListener("click", () => {
         window.dispatchEvent(new CustomEvent("add-to-cart", {
            detail:item
         }))
         btn.textContent = "Added"
         btn.disabled = true;
         setTimeout(() => {
            btn.textContent = "Add to card"
            btn.disabled = false
         }, 900);
      })
      grid.appendChild(card)
   })

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

}
fetchProducts()