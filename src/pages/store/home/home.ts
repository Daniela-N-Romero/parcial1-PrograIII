//lógica: render, búsqueda, filtros
import { PRODUCTS } from "../../../data/data";
import type { Product } from "../../../types/product";
import { getCategories } from "../../../data/data";
import { logout } from "../../../utils/auth";
import { getUser, getCartQuantity, addToCart } from "../../../utils/localStorage";

//FUNCIONES PARA RENDERIZAR CONTENIDO DINÁMICO DE LA PÁGINA
//renderizado de navbar segun estado de autenticación
const navActions = document.getElementById("auth-status") as HTMLDivElement;

function renderNav(){
    const user = getUser(); 
        
    if (user && user.role === "client"){
        navActions.innerHTML = `
            <span class="welcome-user">Hola, ${user.email || 'Cliente'} 👋</span>
            <button onclick="location.href='/src/pages/store/cart/cart.html'" class="cart-btn" id="btn-go-to-cart">
                Carrito <span id="cart-quantity">0</span>
            </button>
            <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
        `;
    } else if (user && user.role === "admin"){
        navActions.innerHTML = `
            <span class="welcome-user">Hola, ${user.nombre || 'Admin'} 👋</span>
            <button class="admin-btn">Modificar catalogo</button>
            <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
        `
    }else{
        navActions.innerHTML = `
            <button onclick="location.href='/src/pages/auth/login/login.html'" class="">Iniciar Sesión</button>
            <button onclick="location.href='/src/pages/auth/registro/registro.html'" class="">Registrarse</button>
        `
    }

    
}

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
//FUNCIONES AUXILIARES DE LA LÓGICA DE LA PÁGINA
//actualizacion contador de carrito
function updateCartBadge(){    
    const cantidad = getCartQuantity();
    const cartBadge = document.getElementById("cart-quantity") as HTMLSpanElement;
    if (cartBadge){
        cartBadge.textContent = cantidad.toString();
    }
}

//filtrado de produtos por categoria
function renderByCategory(id: number) {
        const productosFiltrados = PRODUCTS.filter(producto => 
            producto.categorias.some(cat => cat.id === id)
        );
        renderProducts(productosFiltrados);
        searchInput.value = "";
}


//ESCUCHA DE EVENTOS
//carga de la página
document.addEventListener("DOMContentLoaded", () => {
    renderCategories(); 
    renderProducts(PRODUCTS); 
    renderNav();
    updateCartBadge(); 
});

//escucha el botón de cerrar sesión
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.id === "btn-logout") {
        logout();
        window.location.href = "/index.html";
    }
});

//escucha del botón agregar al carrito (solo si el usuario es cliente)
productsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const user = getUser();
  if (target.classList.contains("add-to-cart-btn")) {
    const id = Number(target.dataset.id);
    if (id && user && user.role === "client") {
      addToCart(id);
      updateCartBadge();
      alert("Producto agregado al carrito");
    }else{
        alert("Tenés que iniciar sesión como cliente para agregar productos al carrito.")
        //diseñar modal alert personalizado para esto, con opciones de ir a login o registrarse, o cerrar el modal
    }
  }
});

//escucha para filtro por categoría
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


//escucha de busqueda por nombre de producto

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


