import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import pizza from '../assets/pizza.png';
import CurrencyConversion from '../functions/CurrencyConversion';
import OrderContext from '../contexts/OrderContext';
import RemoveIcon from '../assets/remove.svg';
import PlusIcon from '../assets/plus.svg';
import CancelIcon from '../assets/cancel.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  display: flex;
  gap: 16px;
  background-color: #fff;
  position: relative;
  padding: 8px 16px;
  border-radius: 8px;

  .btn-close {
    position: absolute;
    right: 16px;
    cursor: pointer;
  }

  .image {
    width: 500px;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .item-name {
    font-size: 20px;
    font-weight: 400;
  }

  .item-description {
    font-size: 16px;
    font-weight: 400;
  }

  .item-price {
    font-size: 16px;
    font-weight: 700;
    color: #ff7a00;
  }

  .label-note {
    font-size: 14px;
    font-weight: 400;
  }

  .item-note {
    margin-top: 8px;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    padding: 8px;
    width: 100%;
    height: 100px;
    resize: none;
    border-radius: 4px;
    border-color: #F2F2F2;
    color: #BCBCBC;
  }
`;

const AddItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;

  .controller {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    padding: 8px;
    width: max-content;
  }

  .btn-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    color: #ffffff;
    background-color: #ff7a00;
    border-radius: 4px;
    border: none;
    padding: 8px 24px;
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const ItemModal = ({ item, setIsClicked }: any) => {
  const { setState } = useContext(OrderContext);
  const [number, setNumber] = useState(1);

  const CloseModal = () => {
    setIsClicked(false);
  };

  const Increment = () => {
    setNumber((number) => number + 1);
  };

  const AddOrder = () => {
    setState((s) => ({
      ...s,
      products: [
        ...s.products,
        { name: item.name, price: item.price, mount: number },
      ],
      total: s.total + number * item.price,
    }));
    setIsClicked(false);
  };

  const Decrement = () => {
    number > 1 && setNumber((number) => number - 1);
  };

  const OutsideClick = (e: any) => {
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes('Wrapper')
    ) {
      setIsClicked(false);
    }
  };

  return (
    <Wrapper onClick={OutsideClick}>
      <Content>
        <div className="btn-close" onClick={CloseModal} >
          <Image alt="icon" src={CancelIcon} />
        </div>
        <div className="image">
            <Image alt="" layout="responsive" src={pizza} />
        </div>
        <div className="item">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-description">{item.description}</p>
          <p className="item-price">{CurrencyConversion(item.price)}</p>
          <div>
            <label className="label-note">Alguma observação?</label>
            <textarea
              className="item-note"
              placeholder="ex.: tirar a cebola, maionese à parte etc..."
            />
          </div>
          <AddItem>
            <div className="controller">
              <Image onClick={Decrement} alt="icon" src={RemoveIcon} />
              <span>{number}</span>
              <Image onClick={Increment} alt="icon" src={PlusIcon} />
            </div>
            <button onClick={AddOrder} className="btn-add">
              <span>Adicionar</span>
              <span>{CurrencyConversion(number * item.price)}</span>
            </button>
          </AddItem>
        </div>
      </Content>
    </Wrapper>
  );
};

export default ItemModal;
