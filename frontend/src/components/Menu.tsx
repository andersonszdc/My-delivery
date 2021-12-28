import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 16px;
  width: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, auto);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(3, auto);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 372px) {
    grid-template-columns: repeat(1, auto);
  }
`;

const Menu = ({ products }: any) => {
  return (
    <Wrapper>
      {products.map((product: any, index: any) => (
        <Item key={index} info={product} />
      ))}
    </Wrapper>
  );
};

export default Menu;
