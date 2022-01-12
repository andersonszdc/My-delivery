import React, { createContext, useState } from 'react';

type OrderType = {
  products: any;
  total: number;
};

type PropsOrderContext = {
  state: OrderType;
  setState: React.Dispatch<React.SetStateAction<OrderType>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_VALUE = {
  state: {
    products: [],
    total: 0,
  },
  setState: () => {},
};

const OrderContext = createContext<PropsOrderContext>(DEFAULT_VALUE);

export const OrderContextProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  return (
    <OrderContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
