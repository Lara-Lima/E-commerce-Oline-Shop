import { allProducts, API_FAKE_STORE } from "../utils/javaScript.js";

const categories = async () => {
  try {
    const response = await fetch(`${API_FAKE_STORE}/categories`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error:", error);
  }
};
// Função para criar um card de produto
const createProductCard = (product) => {
  // Criação dos elementos do card
  const col = document.createElement("div");
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardBody = document.createElement("div");
  const titleLink = document.createElement("a");
  const cardTitle = document.createElement("div");
  const subtitle = document.createElement("p");
  const priceWrapper = document.createElement("div");
  const floatingText1 = document.createElement("span");
  const price = document.createElement("span");
  const floatingText2 = document.createElement("span");

  col.classList.add("col", "px-0");
  card.classList.add("card", "box", "rounded-edge", "h-100", "cardProduct");
  image.classList.add("card-img-top");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  titleLink.classList.add("link-product");
  subtitle.classList.add("card-subtitle", "mb-2", "text-muted");
  floatingText1.classList.add("floating-text");
  price.classList.add("fs-5", "fw-bold");
  floatingText2.classList.add("floating-text");

  const intPrice = Math.floor(product.price); // Parte inteira
  const decimalPart = Math.floor((product.price % 1) * 100);
  const decimalPrice = decimalPart === 0 ? "00" : decimalPart;

  image.src = product.image;
  image.alt = product.title;
  titleLink.textContent = product.title;
  subtitle.textContent = product.description;
  priceWrapper.classList.add("d-flex");
  floatingText1.textContent = "R$";
  price.textContent = intPrice;
  floatingText2.textContent = decimalPrice;

  // Aninhando os elementos
  cardTitle.appendChild(titleLink);

  priceWrapper.appendChild(floatingText1);
  priceWrapper.appendChild(price);
  priceWrapper.appendChild(floatingText2);
  cardBody.appendChild(image);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(subtitle);
  cardBody.appendChild(priceWrapper);
  card.appendChild(cardBody);
  col.appendChild(card);

  card.addEventListener("click", () => {
    window.location.href = `../details/detalhes.html?id=${product.id}`;
  });

  return col;
};

// Função para renderizar os cards no DOM
const productContainer = document.getElementById("productContainer");
const renderProductCards = (products) => {
  const selectCategory = document.getElementById("inputCategory");
  const inputProductName = document.getElementById("inputSearchProduct");
  const buttonSearch = document.getElementById("buttonSearchProduct");
  const inputPriceFrom = document.getElementById("min-price");
  const inputPriceTo = document.getElementById("max-price");
  const buttonFilterPrice = document.getElementById("buttonFilterPrice");
  const buttonSubmitClear = document.getElementById("buttonSubmitClear");
  const formFilter = document.getElementById("formFilter");

  formFilter.addEventListener("submit", (event) => {
    event.preventDefault();

    filterAndRenderProducts();
  });

  buttonSubmitClear.addEventListener("click", () => {
    formFilter.reset();
    filterAndRenderProducts();
  });

  const filterAndRenderProducts = () => {
    const selectedCategory = selectCategory.value;
    const searchKeyword = inputProductName.value.toLowerCase();
    const priceFrom = parseFloat(inputPriceFrom.value);
    const priceTo = parseFloat(inputPriceTo.value);

    console.log("searchKeyword", searchKeyword);

    productContainer.innerHTML = "";

    const filteredProducts = products.filter((product) => {
      if (
        selectedCategory !== "todos" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      if (
        searchKeyword &&
        !product.title.toLowerCase().includes(searchKeyword)
      ) {
        return false;
      }

      if (
        !isNaN(priceFrom) &&
        (isNaN(product.price) || product.price < priceFrom)
      ) {
        return false;
      }

      if (
        !isNaN(priceTo) &&
        (isNaN(product.price) || product.price > priceTo)
      ) {
        return false;
      }

      return true;
    });

    filteredProducts.forEach((product) => {
      const col = createProductCard(product);
      productContainer.appendChild(col);
    });
  };

  products.forEach((product) => {
    const col = createProductCard(product);
    productContainer.appendChild(col);
  });
};

const fillCategories = async () => {
  try {
    const categoriesResponse = await fetch(`${API_FAKE_STORE}/categories`);
    const categories = await categoriesResponse.json();
    const selectCategory = document.getElementById("inputCategory");

    console.log("categories", categories);

    const optionAll = document.createElement("option");
    optionAll.value = "todos";
    optionAll.innerHTML = "Todos";

    selectCategory.appendChild(optionAll);

    categories.forEach((category) => {
      const optionElement = document.createElement("option");
      optionElement.value = category;
      optionElement.innerHTML = category;

      selectCategory.appendChild(optionElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const loadingProductsContainer = document.getElementById(
  "loading-products-container"
);
productContainer.style.display = "none";
fillCategories();
allProducts().then((products) => {
  loadingProductsContainer.style.display = "none";
  productContainer.style.removeProperty("display");
  renderProductCards(products);
});
