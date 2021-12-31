import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logoPng from '../assets/logo.png';
import accountIcon from '../assets/account.svg';
import bagIcon from '../assets/bag.svg';
import logoutIcon from '../assets/logout.svg';
import downArrowIcon from '../assets/downArrow.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 16px 24px;
  align-items: center;
  .navbar {
    display: flex;
    gap: 24px;
  }
`;

const Index: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <Image alt="logo" src={logoPng} />
      </div>
      <div>
        <p>LOJA</p>
        <div>
          {'Bangu'}
          <Image alt="icon" src={downArrowIcon} />
        </div>
      </div>
      <div>
        <p>ENTREGAR EM</p>
        <div>{'Estr. São Pedro de Alcântara, 446'}</div>
      </div>
      <div className="navbar">
        <Image alt="icon" src={accountIcon} />
        <Image alt="icon" src={bagIcon} />
        <Image alt="icon" src={logoutIcon} />
      </div>
    </Wrapper>
  );
};

export default Index;
