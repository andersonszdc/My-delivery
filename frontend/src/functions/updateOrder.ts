type updateOrderProps = {
  state: any;
  setState: (arg0: (s: any) => any) => void;
  index: number;
  newMount: number;
};

const updateOrder = ({
  state,
  setState,
  index,
  newMount,
}: updateOrderProps) => {
  const { price, mount } = state.products[index];
  const newProducts = state.products.map((item: any, newIndex: number) =>
    index == newIndex ? { ...item, mount: newMount } : item
  );
  setState((s) => ({
    ...s,
    products: newProducts,
    total: s.total + (newMount - mount) * price,
  }));
};

export default updateOrder;
