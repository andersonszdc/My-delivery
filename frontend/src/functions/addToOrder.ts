type addToOrderProps = {
  setState: (arg0: (s: any) => any) => void;
  item: any;
  mount: number;
};

const addToOrder = ({ setState, item, mount }: addToOrderProps): void => {
  setState((s) => ({
    ...s,
    products: [...s.products, { name: item.name, price: item.price, mount }],
    total: s.total + mount * item.price,
  }));
};

export default addToOrder;
