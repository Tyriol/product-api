const getProductData = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  const data = await response.json();
  console.log(data.rows);
};

getProductData();
