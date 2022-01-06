import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pizza from '../assets/pizza2.jpg';
import styled from 'styled-components';
import Portal from '../HOC/Portal';
import ItemModal from './ItemModal';
import CurrencyConversion from '../functions/CurrencyConversion';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #f2f2f2;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: .15s ease-out;

  :hover {
    border-color: #ff7a00;
  }

  .item {
    display: grid;
    grid-template:
      'name image' auto
      'description image' auto
      / 4fr 3fr;
    column-gap: 16px;
  }

  .item-name {
    grid-area: name;
    font-size: 20px;
    font-weight: 400;
  }

  .item-description {
    grid-area: description;
    font-size: 16px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    height: 40px;
  }

  .item-image {
    grid-area: image;
    span {
      border-radius: 8px;
    }
  }

  .price {
    font-size: 20px;
    font-weight: 400;
    color: #ff7a00;
  }
`;

const Index = ({ item }: any) => {
  const [isClicked, setIsClicked] = useState(false);

  const openModal = () => {
    setIsClicked(true);
  };

  return (
    <>
      <Wrapper onClick={openModal}>
        <div className="item">
          <h2 className="item-name">{item.name}</h2>
          <h2 className="item-description">{item.description}</h2>
          <div className="item-image">
            <Image src={pizza} alt="" />
          </div>
        </div>
        <h2 className="price">{CurrencyConversion(item.price)}</h2>
      </Wrapper>

      {isClicked && (
        <Portal modal="itemModal">
          <ItemModal item={item} setIsClicked={setIsClicked} />
        </Portal>
      )}
    </>
  );
};

export default Index;
