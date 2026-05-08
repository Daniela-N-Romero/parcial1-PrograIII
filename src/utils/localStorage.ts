import type { CartItem } from "../types/ICartItem";
import type { IUser } from "../types/IUser";
import type { IUserStorage } from "../types/IUserStorage";

export const loginUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUser = () => {
  const user = localStorage.getItem("userData");
  return user? JSON.parse(user) : null;
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

export const getCart = (): CartItem[] => {
  const user = getUser();
  const cart = localStorage.getItem(`cart_${user.email}`);
  return cart ? JSON.parse(cart) : [];
}

export const decreaseQuantity = (id: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item && item.quantity > 1) {
      item.quantity -= 1;
  }
  const user = getUser();
  localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
};

export const addToCart = (id: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item) {
      item.quantity += 1;
  }else{
    cart.push({ id: id, quantity: 1 });
  }
  const user = getUser();
  localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
}

export const removeFromCart = (id: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.id === id);
  if (item) {
      cart.splice(cart.indexOf(item), 1);
    }
  const user = getUser();
  localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
};

export const getCartQuantity = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};