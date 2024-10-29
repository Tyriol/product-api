const productList = document.querySelector(".product-list");

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
