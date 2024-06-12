// // Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};


// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");
// const searchBox = document.querySelector("#search-box");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  
});

document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const products = document.querySelectorAll(".menu-card");
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-button");

  products.forEach((product) => {
    const button = product.querySelector(".add-to-cart");
    button.addEventListener("click", () => {
      const id = product.getAttribute("data-id");
      const name = product.getAttribute("data-name");
      const price = parseInt(product.getAttribute("data-price"));

      addToCart(id, name, price);
    });
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
      const orderDetails = getOrderDetails();
      alert(`Terima kasih telah berbelanja di toko kami.\n\nDetail Pesanan:\n${orderDetails}`);
      clearCart();
    } else {
      alert("Keranjang belanja Anda kosong.");
    }
  });
  
  function getOrderDetails() {
    let orderDetails = "";
    cart.forEach((item) => {
      orderDetails += `${item.name} - Rp. ${item.price} x ${item.quantity}\n`;
    });
    orderDetails += `\nTotal Harga: Rp. ${totalPriceElement.textContent}`;
    return orderDetails;
  }
  

  function addToCart(id, name, price) {
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Rp. ${item.price} x ${item.quantity}`;
      cartItems.appendChild(li);

      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total;
  }

  function clearCart() {
    cart.length = 0;
    renderCart();
  }
});
