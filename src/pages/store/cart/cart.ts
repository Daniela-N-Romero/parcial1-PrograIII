import { PRODUCTS } from "../../../data/data";
import { showAlert } from "../../../utils/alert";
import { getCart, removeFromCart, getUser, addToCart, decreaseQuantity } from "../../../utils/localStorage";

const cartContent = document.getElementById("cart-content") as HTMLElement;
const cartFooter = document.getElementById("cart-footer") as HTMLElement;
const cartTotal = document.getElementById("cart-total") as HTMLElement;

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart-container">
                <p>Tu carrito está vacío 🍕</p>
                <a href="/src/pages/store/home/home.html" class="btn-link">Volver a la tienda</a>
            </div>`;
        if (cartTotal) cartTotal.textContent = "$0.00";
        return;
    }

    let totalGeneral = 0;

    let tableHtml = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (product) {
            const subtotal = product.precio * item.quantity;
            totalGeneral += subtotal;

            tableHtml += `
                <tr>
                    <td>
                        <div class="product-cell">
                            <img src="${product.imagen}" alt="${product.nombre}" width="50">
                            <span>${product.nombre}</span>
                        </div>
                    </td>
                    <td>$${product.precio.toFixed(2)}</td>
                    <td>
                        <div class="quantity-controls">
                        <button class="btn-cantidad minus" data-action="minus" data-id="${product.id}" ${item.quantity <=1 ? "disabled" : ""}>-</button>
                        <span class="cantidad">${item.quantity}</span>
                        <button class="btn-cantidad plus" data-action="plus" data-id="${product.id}" >+</button>
                        </div>
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn-remove" data-id="${product.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        }
    });

    tableHtml += `</tbody></table>`;
    cartContent.innerHTML = tableHtml;

    cartFooter.style.display = "flex";

    if (cartTotal) {
        cartTotal.textContent = `$${totalGeneral.toFixed(2)}`;
    }
}


cartContent.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset.id);

    if (target.classList.contains("btn-cantidad")) {
        const action = target.dataset.action;

        if (action === "plus") {
            addToCart(id);
        } else if (action === "minus") {
            decreaseQuantity(id);
        }
        renderCart();
    }

    if (target.classList.contains("btn-remove")) {
        showAlert("¿Estás seguro que quieres eliminar este producto del carrito?", [
            { label: "Cancelar", callback: () => {} },
            { label: "Eliminar", callback: () => {
                removeFromCart(id);
                renderCart();
            }}
        ]);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();
    //Solo clientes acceden al carrito
    if (!user || user.role !== "client") {
        window.location.href = "/src/pages/auth/login/login.html";
        return;
    }
    renderCart();
});