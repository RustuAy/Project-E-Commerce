export const saveToLocalStorage = (cart) => {
  // *dışarıdan gönderilen ürünü local storageye ekledik.
  localStorage.setItem("cart", JSON.stringify(cart));
};
// *localstorage da veri varsa getir yoksa boç dizi dön
export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const calculateCartTotal = (cart) => {
  // *reduce diziyi tek bir değere indirgemek için kullanılır.
  // *ilk parametre olarak callback func. çağırılır.bu fonsiyonun
  // *parametresine her bir öğenin toplam maliyete eklenmesi için kullanılan matematiksel işlemdir.
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const updateCartIcon = (cart) => {
  const cartIcon = document.getElementById("cart-icon");
  const i = document.querySelector(".bx-shopping-bag");
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  i.setAttribute("data-quantity", totalQuantity);
};
