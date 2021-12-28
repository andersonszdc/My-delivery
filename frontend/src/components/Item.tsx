import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pizza from '../assets/pizza.png';
import styled from 'styled-components';
import Portal from '../HOC/Portal';
import ItemModal from './ItemModal';
import CurrencyConversion from '../functions/CurrencyConversion';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 1px 1px 2px 0px #7D7D7D, -1px -1px 2px 0px #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  align-items: center;
  cursor: pointer;

  .item-img {
    width: 100px;
  }

  .item-label {
    font-size: 14px;
    font-weight: 600;
  }

  .item-price {
    font-size: 16px;
    font-weight: 700;
    color: #FF7A00;
  }
`

const DefaultItem = {
  name: 'Mussarela',
  price: 5.00
}

const Item = ({info}: any) => {

  const [isClicked, setIsClicked] = useState(false)
  const [item, setItem] = useState(DefaultItem)

  const openModal = () => {
    setIsClicked(true)
  }

  useEffect(() => {
    return setItem(info);
  },[setItem, info])

  return (
    <>
    <Wrapper onClick={openModal}>
      <div className="item-img">
        <Image src={pizza} alt='' />
      </div>
      <h2 className="item-label">{item.name}</h2>
      <h2 className="item-price">{CurrencyConversion(item.price)}</h2>
    </Wrapper>
    {isClicked && (
      <Portal>
        <ItemModal item={item} setIsClicked={setIsClicked} />
      </Portal>
    )}
    </>
  );
}

export default Item;