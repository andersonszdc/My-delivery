import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import OrderContext from '../contexts/OrderContext';
import CurrencyConversion from '../utils/CurrencyConversion';
import CancelIcon from '../assets/cancel.svg';
import Image from 'next/image';
import ItemCart from './ItemCart';
import { gql, useMutation } from '@apollo/client';

interface HomeCartProps {
  openCart: boolean;
}

const HomeCart = styled.div<HomeCartProps>`
  position: fixed;
  right: -400px;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
  transition: 0.4s ease-out;

  ${(props) =>
    props.openCart &&
    `
    right: 0px;
  `}
`;

const CheckoutCart = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
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

  .cart__value {
    color: #ff7a00;
    text-align: right;
    font-weight: 300;
    font-size: 16px;
  }

  .bold {
    font-weight: 400;
  }

  .hr-grid-column {
    grid-column: 1/3;
  }

  .cart__btn {
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

const ADD_ORDER_ITEM = gql`
  mutation AddOrderItem($quantity: Int, $order: String, $product: String) {
    addOrderItem(quantity: $quantity, order: $order, product: $product) {
      id
    }
  }
`;

const ADD_ORDER = gql`
  mutation AddOrder {
    addOrder {
      id
    }
  }
`;

const Index = ({ setIsOpenModal, isCheckout }: any) => {
  const route = useRouter();
  const { state, setState } = useContext(OrderContext);
  const [openCart, setOpenCart] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [addOrder] = useMutation(ADD_ORDER);
  const [addOrderItem] = useMutation(ADD_ORDER_ITEM);

  useEffect(() => {
    setTimeout(() => setOpenCart(true), 1);
  }, []);

  const Content = () => {
    return (
      <>
        <Wrapper ref={wrapperRef}>
          <Header>
            <h2 className="cart-label">Seu pedido</h2>
            {!isCheckout && (
              <div className="btn-close" onClick={closeModal}>
                <Image alt="icon" src={CancelIcon} />
              </div>
            )}
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
                <p className="cart__value">{CurrencyConversion(state.total)}</p>
                <p>Taxa de entrega</p>
                <p className="cart__value">R$ 5,00</p>
                <p className="cart__total bold">Total</p>
                <p className="cart__value bold">
                  {CurrencyConversion(state.total + 5)}
                </p>
                {!isCheckout && (
                  <>
                    <hr className="divider-solid hr-grid-column" />
                    <button onClick={createOrder} className="cart__btn">
                      Realizar pagamento
                    </button>
                  </>
                )}
              </Action>
            </>
          ) : (
            <div>Sua sacola está vazia :(</div>
          )}
        </Wrapper>
      </>
    );
  };

  const createOrder = async () => {
    const { data } = await addOrder();
    await state.products.map((item: any) =>
      addOrderItem({
        variables: {
          quantity: item.mount,
          order: data.addOrder.id,
          product: 'f6c6e820-8b50-44ef-9d91-d0a7ee34459a',
        },
      })
    );
    route.push('/checkout');
  };

  const closeModal = () => {
    setOpenCart(false);
    setTimeout(() => setIsOpenModal(false), 400);
  };

  const clickOut = (e: any) => {
    if (!wrapperRef.current?.contains(e.target)) {
      setOpenCart(false);
      setTimeout(() => setIsOpenModal(false), 400);
    }
  };

  return isCheckout ? (
    <CheckoutCart>
      <Content />
    </CheckoutCart>
  ) : (
    <HomeCart onClick={clickOut} openCart={openCart}>
      <Content />
    </HomeCart>
  );
};

export default Index;
