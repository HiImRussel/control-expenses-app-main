import "../css/Product.css";

const Product = ({ cost, name }) => {
  return (
    <section className="Oneproduct">
      <p>{name}</p> <p>{cost} $</p>
    </section>
  );
};

export default Product;
