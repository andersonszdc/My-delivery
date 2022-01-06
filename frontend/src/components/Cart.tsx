import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import OrderContext from '../contexts/OrderContext';
import CurrencyConversion from '../functions/CurrencyConversion';
import CancelIcon from '../assets/cancel.svg';
import Image from 'next/image';
import ItemCart from './ItemCart';

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

  .cart__items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  .cart-label {
    font-size: 20px;
    font-weight: 400;
  }

  .btn-close {
    cursor: pointer;
  }
`;

const Action = styled.div`
  display: grid;
  row-gap: 12px;
  grid-template-columns: 1fr 1fr;
  font-weight: 300;
  font-size: 16px;

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
        <Header>
          <h2 className="cart-label">Seu pedido</h2>
          <div className="btn-close" onClick={() => setIsOpenModal(false)}>
            <Image alt="icon" src={CancelIcon} />
          </div>
        </Header>
        {state.total != 0 ? (
          <>
            <hr className="divider-solid" />
            <div className="cart__items">
              {state.products.map((item: any, index: number) => (
                <ItemCart key={index} index={index} item={item} />
              ))}
            </div>
            <Action>
              <p>Subtotal</p>
              <p className="cart-value">{CurrencyConversion(state.total)}</p>
              <p>Taxa de entrega</p>
              <p className="cart-value">R$ 5,00</p>
              <p>Total</p>
              <p className="cart-value">
                {CurrencyConversion(state.total + 5)}
              </p>
              <button onClick={GoToCheckout} className="cart-btn">
                Realizar pagamento
              </button>
              {message && <p>{message}</p>}
            </Action>
          </>
        ) : (
          <div>Sua sacola está vazia :(</div>
        )}
      </Content>
    </Wrapper>
  );
};

export default Cart;
