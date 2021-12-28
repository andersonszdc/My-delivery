import React, { useContext } from 'react';
import OrderContext from '../contexts/OrderContext';
import CurrencyConversion from '../functions/CurrencyConversion';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: none;

    @media (max-width: 650px) {
        display: flex;
        position: fixed;
        width: 100vw;
        justify-content: space-between;
        padding: 12px 32px;
        background-color: #FF7A00;
        color: #FFF;
        left: 0;
        right: 0;
        bottom: 67px;
    }
`

const MobileCartBar: React.FC = () => {

    const {state} = useContext(OrderContext)

  return (
      <Wrapper>
          <div>
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 1.00018H0.5V3.00018H2.8L6.08 12.0002C6.28631 12.5837 6.66807 13.0892 7.17294 13.4472C7.6778 13.8053 8.28106 13.9984 8.9 14.0002H17.5V12.0002H8.9C8.69449 12.0001 8.49399 11.9367 8.3258 11.8186C8.1576 11.7005 8.02987 11.5334 7.96 11.3402L7.5 10.0002H16.78C17.214 9.99955 17.6361 9.85775 17.9824 9.59618C18.3288 9.33461 18.5806 8.96747 18.7 8.55018L20.5 2.27018C20.5406 2.13886 20.5538 2.00057 20.5386 1.86395C20.5234 1.72733 20.4802 1.59531 20.4117 1.47613C20.3432 1.35695 20.2509 1.25317 20.1404 1.17128C20.03 1.08939 19.9039 1.03114 19.77 1.00018C19.6806 0.985618 19.5894 0.985618 19.5 1.00018ZM16.75 8.00018H6.75L4.93 3.00018H18.17L16.75 8.00018Z" fill="white"/>
                <path d="M9 18C9.82843 18 10.5 17.3284 10.5 16.5C10.5 15.6716 9.82843 15 9 15C8.17157 15 7.5 15.6716 7.5 16.5C7.5 17.3284 8.17157 18 9 18Z" fill="white"/>
                <path d="M15 18C15.8284 18 16.5 17.3284 16.5 16.5C16.5 15.6716 15.8284 15 15 15C14.1716 15 13.5 15.6716 13.5 16.5C13.5 17.3284 14.1716 18 15 18Z" fill="white"/>
            </svg>
          </div>
          <p>Ver carrinho</p>
          <p>{CurrencyConversion(state.total)}</p>
      </Wrapper>
  );
}

export default MobileCartBar;