import { getNumberAllProducts } from "../utils/javaScript.js";

const getProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error:", error);
  }
};

const displayProductDetails = (product) => {
  const productNameElement = document.getElementById("productName");
  const categoryElement = document.getElementById("category");
  const descriptionElement = document.getElementById("description");
  const rateElement = document.getElementById("rate");
  const imageElement = document.getElementById("productImage");

  imageElement.classList.add("p-4");

  imageElement.src = product.image;
  imageElement.alt = product.title;

  productNameElement.textContent = product.title;
  categoryElement.textContent = product.category;
  descriptionElement.textContent = product.description;
  rateElement.textContent = `Avaliação: ${product.rating.rate}/5`;
};

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("id") || 1;
const showProductCard = () => {
  const emptyProductElement = document.getElementById("emptyProduct");
  const productCardElement = document.getElementById("productCard");
  emptyProductElement.style.display = "none";
  productCardElement.style.display = "block";
};

async function handleDisplayDetails() {
  if (productId) {
    const loadingProductsDetails = document.getElementById(
      "loading-products-details"
    );
    const cardProductDetails = document.getElementById("card-product-detail");
    const buttonPrevious = document.getElementById("buttonPrevious");
    const buttonNext = document.getElementById("buttonNext");

    const totalProducts = await getNumberAllProducts();

    getProductDetails(productId)
      .then((product) => {
        cardProductDetails.classList.remove("d-none");
        cardProductDetails.classList.add("d-flex");
        loadingProductsDetails.style.display = "none";
        displayProductDetails(product);

        if (productId === "1") {
          buttonPrevious.style.display = "none";
        } else {
          buttonPrevious.style.display = "block";
        }

        if (parseInt(productId) === totalProducts) {
          buttonNext.style.display = "none";
        } else {
          buttonNext.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

if (productId) {
  getProductDetails(productId)
    .then((product) => {
      displayProductDetails(product);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const navigateToNextProduct = async () => {
  const nextProductId = parseInt(productId) + 1;
  const nextProduct = await getProductDetails(nextProductId);

  if (nextProduct) {
    window.location.href = `detalhes.html?id=${nextProduct.id}`;
  }
};

const navigateToPreviousProduct = async () => {
  if (productId > 1) {
    const previousProductId = parseInt(productId) - 1;
    const previousProduct = await getProductDetails(previousProductId);

    if (previousProduct) {
      window.location.href = `detalhes.html?id=${previousProduct.id}`;
    }
  }
};

const buttonNext = document.getElementById("buttonNext");
const buttonPrevious = document.getElementById("buttonPrevious");

buttonNext.addEventListener("click", navigateToNextProduct);
buttonPrevious.addEventListener("click", navigateToPreviousProduct);

handleDisplayDetails();
