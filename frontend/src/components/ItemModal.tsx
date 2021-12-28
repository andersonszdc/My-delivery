import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import pizza from '../assets/pizza.png';
import CurrencyConversion from '../functions/CurrencyConversion';
import OrderContext from '../contexts/OrderContext';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

const Content = styled.div`
  display: flex;
  gap: 32px;
  background-color: #EFEEEE;
  position: relative;
  padding: 8px 16px;
  border-radius: 16px;
  box-shadow: 1px 1px 2px 0px #7D7D7D, -1px -1px 2px 0px #FFFFFF;

  .btn-close {
    position: absolute;
    right: 16px;
    cursor: pointer;
  }

  .item-img {
    display: flex;
    align-items: center;
    width: 200px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .item-name {
    font-size: 14px;
    font-weight: 600;
  }

  .item-description {
    font-size: 12px;
    font-weight: 600;
    color: #00000066;
  }

  .item-price {
    font-size: 16px;
    font-weight: 700;
    color: #FF7A00;
  }

  .label-note {
    font-size: 14px;
    font-weight: 600;
  }

  .item-note {
    margin-top: 8px;
    font-family: 'Quicksand';
    font-size: 12px;
    font-weight: 600;
    padding: 12px;
    width: 100%;
    height: 100px;
    resize: none;
    border-radius: 8px;
    color: #909090;
  }
`
  
  const AddItem = styled.div`
  display: flex;

  .controller {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 0 8%;
  }

  .btn-mount {
    display: inline-flex;
    align-items: center;
    height: 100%;
    background-color: #FF7A00;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
  }

  .btn-add {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
    color: #FFFFFF;
    background-color: #FF7A00;
    border-radius: 12px;
    border: none;
    padding: 8px 24px;
    font-family: 'Quicksand';
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
  }
`

const ItemModal = ({item, setIsClicked}: any) => {

  const {setState} = useContext(OrderContext)
  const [number, setNumber] = useState(1)

  const closeModal = () => {
    setIsClicked(false)
  }

  const Increment = () => {
    setNumber(number => number + 1)
  }

  const AddOrder = () => {
    setState(s => ({
      ...s,
      products: [
        ...s.products,
        {name: item.name, price: item.price, mount: number}
      ],
      total: s.total + number*item.price
    }))
    setIsClicked(false)
  }

  const Decrement = () => {
    number > 1 && setNumber(number => number - 1)
  }

  const OutsideClick = (e: any) => {
    if (typeof e.target.className === 'string' && e.target.className.includes('Wrapper')) {
      setIsClicked(false)
    }
  }

  return (
    <Wrapper onClick={OutsideClick}>
      <Content>
        <svg className="btn-close" onClick={closeModal} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.351472 11.6485C0.820101 12.1172 1.5799 12.1172 2.04853 11.6485L6 7.69706L9.95147 11.6485C10.4201 12.1172 11.1799 12.1172 11.6485 11.6485C12.1172 11.1799 12.1172 10.4201 11.6485 9.95147L7.69706 6L11.6485 2.04853C12.1172 1.5799 12.1172 0.820101 11.6485 0.351472C11.1799 -0.117157 10.4201 -0.117157 9.95147 0.351472L6 4.30294L2.04853 0.351472C1.5799 -0.117157 0.820101 -0.117157 0.351472 0.351472C-0.117157 0.820101 -0.117157 1.5799 0.351472 2.04853L4.30294 6L0.351472 9.95147C-0.117157 10.4201 -0.117157 11.1799 0.351472 11.6485Z" fill="black"/>
        </svg>
        <div className="item-img">
          <div>
            <Image alt='' src={pizza} />
          </div>
        </div>
        <div className="item-info">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-description">{item.description}</p>
          <p className="item-price">{CurrencyConversion(item.price)}</p>
          <div>
            <label className="label-note">Alguma observação?</label>
            <textarea className="item-note" placeholder="ex.: tirar a cebola, maionese à parte etc..." />
          </div>
          <AddItem>
            <div className="controller">
              <span className="btn-mount" onClick={Decrement}>
                <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1.5H5H1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <span>
                {number}
              </span>
              <span className="btn-mount" onClick={Increment}>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9.5V5.5M5 5.5V1.5M5 5.5H9M5 5.5H1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
            <button onClick={AddOrder} className="btn-add">
              <span>Adicionar</span>
              <span>{CurrencyConversion(number*item.price)}</span>
            </button>
          </AddItem>
        </div>
      </Content>
    </Wrapper>
  );
}

export default ItemModal;