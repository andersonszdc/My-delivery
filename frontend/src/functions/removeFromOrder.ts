type removeFromOrderProps = {
  state: any;
  setState: (arg0: (s: any) => any) => void;
  index: number;
};

const removeFromOrder = ({ state, setState, index }: removeFromOrderProps) => {
  const price = state.products[index].price;
  const newProducts = state.products;
  newProducts.splice(index, 1);
  setState((s) => ({ ...s, products: newProducts, total: s.total - price }));
};

export default removeFromOrder;
