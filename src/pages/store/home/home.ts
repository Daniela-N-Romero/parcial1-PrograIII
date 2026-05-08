//lógica: render, búsqueda, filtros
import { PRODUCTS } from "../../../data/data";
import type { Product } from "../../../types/product";
import { getCategories } from "../../../data/data";
import { getCartQuantity, addToCart } from "../../../utils/localStorage";

//renderizado de categorias en el aside
const categoriesList = document.getElementById("categories-list") as HTMLUListElement;

function renderCategories() {
    const categories = getCategories();
    categoriesList.innerHTML = "";
    const todasLi = document.createElement("li");
    todasLi.textContent = "Todas las categorias";
    todasLi.classList.add("clicked");
    todasLi.dataset.id = "all";
    categoriesList.appendChild(todasLi);
    categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.nombre;
        li.dataset.id = category.id.toString();
        categoriesList.appendChild(li);
    });
}


//renderizado de productos en el main
const productsContainer = document.getElementById("products-container") as HTMLDivElement;

function renderProducts(products: Product[]) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const sinStock = product.stock === 0;
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
            <h3 class="product-name">${product.nombre}</h3>
            <div class="product-info">
                <p class="product-description">${product.descripcion}</p>
                <p class="product-price">$${product.precio.toFixed(2)}</p>
            </div>
            <button data-id=${product.id} class="add-to-cart-btn "${sinStock ? 'disabled' : ''}>
        ${sinStock ? 'Sin Stock' : 'Agregar al carrito'}</button>
        `;
        productsContainer.appendChild(div);
});
    if (products.length === 0){
        productsContainer.innerHTML = "<p class='no-results'>No se encontraron productos que coincidan con tu búsqueda</p>";
    }

}

//carga de la página
document.addEventListener("DOMContentLoaded", () => {
    renderCategories(); 
    renderProducts(PRODUCTS); 
    updateCartBadge(); 
});


//actualizacion de carrito
function updateCartBadge(){    
    const cantidad = getCartQuantity();
    const cartBadge = document.getElementById("cart-quantity") as HTMLSpanElement;
    cartBadge.textContent = cantidad.toString();
}


productsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("add-to-cart-btn")) {
    const id = Number(target.dataset.id);
    if (id) {
      addToCart(id);
      updateCartBadge();
      alert("Producto agregado al carrito");
    }
  }
});


//filtrado por busqueda

const searchInput = document.getElementById("input-search") as HTMLInputElement;

searchInput.addEventListener("input", () => {
    categoriesList.querySelector("li[class='clicked']")?.classList.remove("clicked");
    categoriesList.querySelector("li[data-id='all']")?.classList.add("clicked")
    const query = searchInput.value.toLowerCase();
    const productosFiltrados = PRODUCTS.filter(producto => 
        producto.nombre.toLowerCase().includes(query)
    );
    renderProducts(productosFiltrados);

});

//filtrado de produtos por categoria
function renderByCategory(id: number) {
        const productosFiltrados = PRODUCTS.filter(producto => 
            producto.categorias.some(cat => cat.id === id)
        );
        renderProducts(productosFiltrados);
        searchInput.value = "";
}

categoriesList.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    categoriesList.querySelectorAll("li").forEach(li => li.classList.remove("clicked"));
      if (target.dataset.id === "all") {
        target.classList.add("clicked");
        renderProducts(PRODUCTS);
      }else if (target.dataset.id) {
        renderByCategory(Number(target.dataset.id));
        target.classList.add("clicked");
      }
});

