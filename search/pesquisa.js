import { allProducts } from "../utils/javaScript.js";

const redirectToDetails = (productId) => {
  window.location.href = `../details/detalhes.html?id=${productId}`;
};

const addClickEventToProducts = () => {
  const productElements = document.getElementsByClassName("list-group-item");

  Array.from(productElements).forEach((productElement) => {
    productElement.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = productElement.dataset.productId;
      redirectToDetails(productId);
    });
  });
};

const createProductElement = (product) => {
  const productElement = document.createElement("a");
  const imageElement = document.createElement("img");
  const contentElement = document.createElement("div");
  const titleElement = document.createElement("h5");
  const ratingElement = document.createElement("small");
  const descriptionElement = document.createElement("p");
  const categoryElement = document.createElement("small");
  const flexContainer = document.createElement("div");

  productElement.classList.add(
    "list-group-item",
    "list-group-item-action",
    "d-flex",
    "gap-4"
  );
  imageElement.classList.add("product-image");
  contentElement.classList.add("w-100");

  titleElement.classList.add("mb-1");
  descriptionElement.classList.add("mb-1");
  flexContainer.classList.add("d-flex", "w-100", "justify-content-between");

  productElement.href = "#";
  imageElement.src = product.image;
  titleElement.textContent = product.title;
  ratingElement.textContent = `Avaliação do produto: ${product.rating.rate}/5`;
  descriptionElement.textContent = product.description;
  categoryElement.textContent = `Categoria do produto: ${product.category}`;

  flexContainer.appendChild(titleElement);
  flexContainer.appendChild(ratingElement);
  contentElement.appendChild(flexContainer);
  contentElement.appendChild(descriptionElement);
  contentElement.appendChild(categoryElement);
  productElement.appendChild(imageElement);
  productElement.appendChild(contentElement);

  productElement.dataset.productId = product.id;

  return productElement;
};

const displayProductList = (products) => {
  const inputSearch = document.getElementById("inputSearch");

  const productListElement = document.getElementById("productList");
  productListElement.innerHTML = "";

  products.forEach((product) => {
    const productElement = createProductElement(product);
    productListElement.appendChild(productElement);
  });

  addClickEventToProducts();

  inputSearch.addEventListener("input", (e) => {
    productListElement.innerHTML = "";
    products
      .filter((product) => {
        if (product.title.toLowerCase().includes(e.target.value)) {
          return true;
        }
      })
      .forEach((product) => {
        const productElement = createProductElement(product);
        productListElement.appendChild(productElement);
      });
  });
};

allProducts().then((products) => {
  displayProductList(products);
});
