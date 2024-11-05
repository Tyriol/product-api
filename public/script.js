const productList = document.querySelector(".product-list");
const newProductSubmitButton = document.querySelector(".add-product-submit");

const handleSubmit = async (e) => {
  e.preventDefault();
  // post new product
  const newProductAdded = await addProduct();
  alert(newProductAdded.data.name + " added");
};

const addProduct = async () => {
  const response = await fetch("http://localhost:3001/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  return data;
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

const renderButton = (buttonText, buttonClass) => {
  const button = document.createElement("button");
  button.setAttribute("class", buttonClass);
  button.innerText = buttonText;
  return button;
};

// !! Render List Item
const renderListItem = (product) => {
  const productName = product.name;
  const listItem = document.createElement("li");
  const editButton = renderButton("EDIT", "edit-button");
  const deleteButton = renderButton("DELETE", "delete-button");
  listItem.innerHTML = productName;
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
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
