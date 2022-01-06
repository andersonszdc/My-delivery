import React, { useContext, useState } from 'react';
import Image from 'next/image';
import OrderContext from '../contexts/OrderContext';
import RemoveIcon from '../assets/remove.svg';
import PlusIcon from '../assets/plus.svg';
import CurrencyConversion from '../functions/CurrencyConversion';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';

const Wrapper = styled.div`
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

type IndexProps = {
  item: any;
  index: number;
};

const Index = ({ item, index }: IndexProps) => {
  const { state, setState } = useContext(OrderContext);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [indexDelete, setIndexDelete] = useState(0);

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

  return (
    <>
      <Wrapper>
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
      </Wrapper>

      {isOpenDeleteModal && (
          <DeleteModal index={index} close={setIsOpenDeleteModal} />
      )}
    </>
  );
};

export default Index;
