import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import OrderContext from '../contexts/OrderContext';
import Portal from '../HOC/Portal';
import CurrencyConversion from '../functions/CurrencyConversion';
import DeleteModal from './DeleteModal';
import MobileCartBar from './MobileCartBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  .cart-label {
    font-size: 16px;
    font-weight: 600;
    box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
    padding: 8px 16px;
    border-radius: 16px;
  }

  .cart-items {
    box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
    padding: 8px 16px;
    border-radius: 16px;
  }

  .cart-info {
    display: grid;
    row-gap: 12px;
    grid-template-columns: 1fr 1fr;
    box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
    border-radius: 16px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 12px;
  }

  .cart-value {
    color: #ff7a00;
    text-align: right;
    font-weight: 600;
    font-size: 12px;
  }

  .cart-btn {
    border-radius: 12px;
    background-color: #ff7a00;
    color: #ffffff;
    padding: 8px 24px;
    grid-column: 1/3;
    border: none;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 12px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .item {
    font-size: 12px;
    font-weight: 700;
  }

  .controller {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .btn-mount {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .item-mount {
    font-size: 16px;
    font-weight: 700;
  }

  .price {
    text-align: right;
  }
`;

const Cart = ({ hasButton }: any) => {
  const route = useRouter();
  const { state, setState } = useContext(OrderContext);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [indexDelete, setIndexDelete] = useState(0);
  const [message, setMessage] = useState('');

  const Decrement = (index: number) => {
    const newProducts = state.products.map((item: any, newIndex: any) =>
      item.mount > 1 && index == newIndex
        ? { ...item, mount: item.mount - 1 }
        : item
    );
    state.products[index].mount > 1 &&
      setState((s) => ({
        ...s,
        products: newProducts,
        total: s.total - s.products[index].price,
      }));
    setIndexDelete(index);
    state.products[index].mount == 1 && setIsOpenDeleteModal(true);
  };

  const Increment = (index: number) => {
    const newProducts = state.products.map((item: any, newIndex: any) =>
      index == newIndex ? { ...item, mount: item.mount + 1 } : item
    );
    setState((s) => ({
      ...s,
      products: newProducts,
      total: s.total + s.products[index].price,
    }));
  };

  const GoToCheckout = () => {
    if (state.total <= 0) {
      setMessage('Seu carrinho está vazio!');
    } else {
      route.push('/checkout');
    }
  };

  return (
    <>
      <MobileCartBar />
      <Wrapper>
        <h2 className="cart-label">Meu carinho</h2>
        <div className="cart-items">
          {state.products.length !== 0 ? (
            state.products.map((item: any, index: any) => (
              <Item key={index}>
                <p className="item">{item.name}</p>
                {hasButton ? (
                  <div className="controller">
                    <span
                      className="btn-mount"
                      onClick={() => Decrement(index)}
                    >
                      <svg
                        width="10"
                        height="3"
                        viewBox="0 0 10 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1.5H5H1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="item-mount">{item.mount}</span>
                    <span
                      className="btn-mount"
                      onClick={() => Increment(index)}
                    >
                      <svg
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 9.5V5.5M5 5.5V1.5M5 5.5H9M5 5.5H1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div />
                )}
                <p className="item price">
                  {CurrencyConversion(item.price * item.mount)}
                </p>
              </Item>
            ))
          ) : (
            <div>sem itens</div>
          )}
        </div>
        <div className="cart-info">
          <p>Subtotal: </p>
          <p className="cart-value">{CurrencyConversion(state.total)}</p>
          <p>Taxa de entrega: </p>
          <p className="cart-value">R$ 5,00</p>
          <p>Total: </p>
          <p className="cart-value">{CurrencyConversion(state.total + 5)}</p>

          {hasButton && (
            <button onClick={GoToCheckout} className="cart-btn">
              Realizar pagamento
            </button>
          )}
          {message && <p>{message}</p>}
        </div>
      </Wrapper>
      {isOpenDeleteModal && (
        <Portal>
          <DeleteModal close={setIsOpenDeleteModal} index={indexDelete} />
        </Portal>
      )}
    </>
  );
};

export default Cart;
