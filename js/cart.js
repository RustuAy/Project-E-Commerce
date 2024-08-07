import {
  calculateCartTotal,
  getCartFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";
export let cart = getCartFromLocalStorage();

export const addToCart = (event, products) => {
  // *tıkladığımız ürünün idsine dataset ile eriş.
  // *product.js içerisinde js e çektiğimiz back tick içerisindeki
  // *add to cart özelliğine süslü parantez dolarla product.id ekle
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => productID === product.id);
  // *eğer tıklanan ürün bulunursa if bloğu içerisine gir
  if (product) {
    // *tıkladığımız ürün önceden sepette varsa find methodu kullanarak buluruz
    const existingItem = cart.find((item) => item.id === productID);
    // *sepette bu üründen önceden varsa miktarını arttır
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // *sepete ilk defa ürün eklendiği için yeni eklenen
      // *ürün miktarını obje içerisinde tanımladık
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    // * locakStorage a veri ekle
    saveToLocalStorage(cart);
    // *sepete eklenen ürünün a etiketinin içeriğini ekranda değiştir.
    event.target.textContent = "Added";

    updateCartIcon(cart);
    displayCartTotal();
  }
};

export const renderCartItems = () => {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
              <img
                width="100"
                src="${item.image}"
                alt=""
              />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
              </div>
              <h2>$${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  const removeButtons = document.getElementsByClassName("remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", changeQuantity);
  }
};

const removeFromCart = (event) => {
  const productID = Number(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  // *localstorage güncelle
  saveToLocalStorage(cart);
  // *sayfa güncelle
  renderCartItems();
  // *toplam miktarı günceller
  displayCartTotal();

  updateCartIcon(cart);
};

const changeQuantity = (event) => {
  const productID = Number(event.target.dataset.id);
  const quantity = Number(event.target.value);
  // * inputa girilen miktar sıfırdan büyükse
  if (quantity > 0) {
    // *cart dizisi içerisinde gğüncellemek istediğimiz ürünü id ye göre bul
    const cartItem = cart.find((item) => item.id === productID);
    // *ürün bulunduysa
    if (cartItem) {
      //*bulduğumuz ürünün miktarını inputa girilen miktarla değiştirdik
      cartItem.quantity = quantity;
      // * localstorage güncelleme
      saveToLocalStorage(cart);
      // *toplam fiyatı güncellemeye yarar
      displayCartTotal();

      updateCartIcon(cart);
    }
  }
};

export const displayCartTotal = () => {
  const cartTotalElement = document.getElementById("cartTotal");
  // *toplam miktarı alırız
  const total = calculateCartTotal(cart);
  // *total etiketinin içerisine veri gönderme
  cartTotalElement.textContent = `Total:$${total.toFixed(2)}`;
};
