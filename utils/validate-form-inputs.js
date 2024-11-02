export const validateFormInputs = (req) => {
  const errors = [];
  // Check that that stock numnber is alphanumeric and always 10 characters long
  const alphanumericRegex = new RegExp(/^[a-z0-9]{10}$/i);
  let isValidStockNumber = alphanumericRegex.test(req.body.stockNumber);
  if (!isValidStockNumber) {
    errors.push(
      "Stock number is not AlphaNumeric or it's not 10 characters exactly"
    );
  }
  if (!req.body.stockNumber) {
    errors.push("No stock number specified");
  }
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (!req.body.description) {
    errors.push("No description specified");
  }
  if (!req.body.price) {
    errors.push("No price specified");
  }
  if (errors.length) {
    // res.status(400).json({ error: errors.join(", ") });
    return errors;
  }
};
