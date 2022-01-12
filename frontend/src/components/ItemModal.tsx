import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import pizza from '../assets/pizza2.jpg';
import CurrencyConversion from '../utils/CurrencyConversion';
import OrderContext from '../contexts/OrderContext';
import RemoveIcon from '../assets/remove.svg';
import PlusIcon from '../assets/plus.svg';
import CancelIcon from '../assets/cancel.svg';
import addToOrder from '../functions/addToOrder';
import updateOrder from '../functions/updateOrder';

const Wrapper = styled.div`
  z-index: 1;
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

type ContentProps = {
  openModal: boolean;
};

const Content = styled.div<ContentProps>`
  position: relative;
  display: grid;
  grid-template:
    'image header' 54px
    'image scrolling' auto
    'image action' 74px
    / 1fr 1fr;
  background-color: #fff;
  border-radius: 8px;
  transform: translateY(50%);
  opacity: 0;
  transition: 0.3s ease-in-out;

  ${(props) =>
    props.openModal &&
    `
    transform: translateY(0%);
    opacity: 1;
  `}

  .btn-close {
    position: absolute;
    right: 16px;
    cursor: pointer;
  }

  .image {
    padding: 16px;
    width: 100%;
    grid-area: image;
    span {
      border-radius: 8px;
    }
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
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  padding: 16px;
  grid-area: action;

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

  .controller-btn {
    cursor: pointer;
  }

  .btn-add {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    color: #ffffff;
    background-color: #ff7a00;
    border-radius: 4px;
    border: none;
    padding: 8px 24px;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Scrolling = styled.div`
  grid-area: scrolling;
  padding: 16px;
  max-width: 45vw;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .item-description {
    font-size: 16px;
    font-weight: 400;
    line-clamp: 2;
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
    border-color: #f2f2f2;
    color: #bcbcbc;
    :focus {
      outline: 0.5px solid #ff7b00;
    }
  }
`;

const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

interface IndexProps {
  item?: any;
  setIsClicked: (arg0: boolean) => void;
  update?: boolean;
  index?: number;
}

const Index = ({ item, setIsClicked, update, index }: IndexProps) => {
  const { state, setState } = useContext(OrderContext);
  const [mount, setNumber] = useState(item ? 1 : state.products[index!].mount);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState(item ? item : state.products[index!]);

  useEffect(() => {
    setInterval(() => setOpenModal(true), 1);
  }, []);

  const Increment = () => {
    setNumber((mount: number) => mount + 1);
  };

  const Decrement = () => {
    mount > 1 && setNumber((mount: number) => mount - 1);
  };

  const AddProduct = () => {
    update
      ? updateOrder({ state, setState, index: index as number, newMount: mount })
      : addToOrder({ setState, item, mount });
    setIsClicked(false);
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
      <Content openModal={openModal}>
        <div className="image">
          <Image alt="" layout="responsive" src={pizza} />
        </div>
        <Header>
          <h2 className="item-name">{product.name}</h2>
          <div className="btn-close" onClick={() => setIsClicked(false)}>
            <Image alt="icon" src={CancelIcon} />
          </div>
        </Header>
        <Scrolling>
          <p className="item-description">{product.description}</p>
          <p className="item-price">{CurrencyConversion(product.price)}</p>
          <div>
            <label className="label-note">Alguma observação?</label>
            <textarea
              className="item-note"
              placeholder="ex.: tirar a cebola, maionese à parte etc..."
            />
          </div>
        </Scrolling>
        <Action>
          <div className="controller">
            <Image
              className="controller-btn"
              onClick={Decrement}
              alt="icon"
              src={RemoveIcon}
            />
            <span>{mount}</span>
            <Image
              className="controller-btn"
              onClick={Increment}
              alt="icon"
              src={PlusIcon}
            />
          </div>
          <button onClick={AddProduct} className="btn-add">
            <span>{update ? 'Atualizar' : 'Adicionar'}</span>
            <span>{CurrencyConversion(mount * product.price)}</span>
          </button>
        </Action>
      </Content>
    </Wrapper>
  );
};

export default Index;
