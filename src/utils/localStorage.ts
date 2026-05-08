import type { IUser } from "../types/IUser";
import type { IUserStorage } from "../types/IUserStorage";
import type { Product } from "../types/product";

export const loginUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUser = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const getUsers = (): IUserStorage[] => {
    const users = localStorage.getItem("users")
    return users? JSON.parse(users) : [] 
}

export const saveUser = (user: IUserStorage) => {
  const users = getUsers();
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users));
};

interface CartItem {
  id: number;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export const addToCart = (id: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item) {
      item.quantity += 1;
  }else{
    cart.push({ id: id, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item) {
      cart.splice(cart.indexOf(item), 1);
    }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartQuantity = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};