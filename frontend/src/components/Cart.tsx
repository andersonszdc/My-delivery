import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import OrderContext from '../contexts/OrderContext';
import CurrencyConversion from '../functions/CurrencyConversion';
import RemoveIcon from '../assets/remove.svg';
import PlusIcon from '../assets/plus.svg';
import CancelIcon from '../assets/cancel.svg';
import Image from 'next/image';

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  background-color: #fff;
  height: 100%;
  padding: 32px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  .cart-label {
    font-size: 20px;
    font-weight: 400;
  }

  .cart-items {
  }

  .cart-info {
    display: grid;
    row-gap: 12px;
    grid-template-columns: 1fr 1fr;
    font-weight: 300;
    font-size: 16px;
  }

  .cart-value {
    color: #ff7a00;
    text-align: right;
    font-weight: 300;
    font-size: 16px;
  }

  .cart-btn {
    border-radius: 4px;
    background-color: #ff7a00;
    color: #ffffff;
    padding: 12px;
    grid-column: 1/3;
    border: none;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .item {
    font-size: 16px;
    font-weight: 300;
  }

  .controller {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .controller-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .item-mount {
    font-size: 16px;
    font-weight: 500;
  }

  .price {
    font-weight: 400;
    text-align: right;
  }
`;

const Cart = ({ setIsOpenModal }: any) => {
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

  const CloseModal = (e: any) => {
    if (e.target.className.includes('Wrapper')) {
      setIsOpenModal(false);
    }
  };

  return (
    <Wrapper onClick={CloseModal}>
      <Content>
        <h2 className="cart-label">Seu pedido</h2>
        <div className="cart-items">
          {state.products.length !== 0 ? (
            state.products.map((item: any, index: any) => (
              <Item key={index}>
                <p className="item">{item.name}</p>
                <div className="controller">
                  <Image
                    alt="icon"
                    className="controller-btn"
                    onClick={() => Decrement(index)}
                    src={RemoveIcon}
                  />
                  <span className="item-mount">{item.mount}</span>
                  <Image
                    alt="icon"
                    className="controller-btn"
                    onClick={() => Increment(index)}
                    src={PlusIcon}
                  />
                </div>
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
          <p>Subtotal</p>
          <p className="cart-value">{CurrencyConversion(state.total)}</p>
          <p>Taxa de entrega</p>
          <p className="cart-value">R$ 5,00</p>
          <p>Total</p>
          <p className="cart-value">{CurrencyConversion(state.total + 5)}</p>
          <button onClick={GoToCheckout} className="cart-btn">
            Realizar pagamento
          </button>
          {message && <p>{message}</p>}
        </div>
      </Content>
    </Wrapper>
  );
};

export default Cart;
