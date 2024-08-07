export const fetchProducts = async () => {
  try {
    // *db.json dosyanına istek gönder.
    const response = await fetch("db.json");
    // *Hata olursa yeni hata oluştur.
    if (!response.ok) {
      throw new Error("Üzgünüz bir hata oluştu");
    }
    // *Veriyi json a çevir ve dışarı aktar.
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const renderProducts = (products, addToCartCallback) => {
  // *productList id'li etiketi JS'e çek
  const productList = document.getElementById("productList");
  // *parametre olarak gelen ürünleri dönüp herbir ürün için HTML oluştur.
  productList.innerHTML = products
    .map(
      (product) => ` <div class="product">
          <img
            src="${product.image}"
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${product.price}$</p>
            <a class="add-to-cart" data-id=${product.id}"$>Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  // *Bütün ekleme butonlarını seçmek için getelementclassname kullan
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  // *Bu butonları index numarasına göre bulmak için for kullan sonra olay izleyicisi ekle
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallback);
  }
};
