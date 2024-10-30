const productList = document.querySelector(".product-list");
const newProductSubmitButton = document.querySelector(".add-product-submit");

const handleSubmit = (e) => {
  e.preventDefault();
  // post new product
  addProduct();
};

const addProduct = async () => {
  const response = await fetch("http://localhost:3001/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  console.log(data);
};

const gatherFormData = () => {
  const stockNumber = document.querySelector("#stock-number").value;
  const name = document.querySelector("#product-name").value;
  const description = document.querySelector("#product-description").value;
  const price = document.querySelector("#product-price").value;
  return {
    stockNumber,
    name,
    description,
    price,
  };
};

newProductSubmitButton.addEventListener("click", handleSubmit);

const getProductData = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  const data = await response.json();
  return data.rows;
};

// !! Clear list
const clearList = () => {
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
};

// !! Render List Item
const renderListItem = (product) => {
  const productName = product.name;
  const listItem = document.createElement("li");
  listItem.innerText = productName;
  return listItem;
};

// !! Render Product list !!
const renderProductList = async () => {
  clearList();
  const productData = await getProductData();
  productData.map((product) => {
    const listItem = renderListItem(product);
    productList.appendChild(listItem);
  });
};

renderProductList();

// POST new product
// add event listener to submit button
// test event response
