import Product from "./Product";
import "../css/ProductList.css";

const ProductList = ({ expenses }) => {
  const products = expenses.map((expense) => (
    <Product
      name={expense.name}
      cost={expense.cost}
      key={Math.floor(Math.random() * 999999)}
    />
  ));

  return <section className="productList">{products}</section>;
};

export default ProductList;
