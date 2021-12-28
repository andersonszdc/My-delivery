import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MobileNavBar from './MobileNavBar';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .navBar {
    display: flex;
    gap: 32px;
  }

  .navBar-item {
    box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 16px;
    color: #000000;
  }

  .perfil {
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
    padding: 8px 16px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const NavBar: React.FC = () => {
  return (
    <>
      <Wrapper>
        <div className="navBar">
          <Link href="/">
            <a className="navBar-item">Cardápio</a>
          </Link>
          <Link href="/contato">
            <a className="navBar-item">Contato</a>
          </Link>
          <Link href="/entrega">
            <a className="navBar-item">Área de entrega</a>
          </Link>
        </div>
        <div className="perfil">
          Olá, Anderson
          <svg
            width="20"
            height="13"
            viewBox="0 0 20 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.514977 1.03383C1.20161 0.322056 2.31487 0.322056 3.00151 1.03383L10 8.28856L16.9985 1.03383C17.6851 0.322056 18.7984 0.322056 19.485 1.03383C20.1717 1.74561 20.1717 2.89962 19.485 3.6114L11.5541 11.8327C10.6958 12.7224 9.30421 12.7224 8.44592 11.8327L0.514977 3.6114C-0.171659 2.89962 -0.171659 1.74561 0.514977 1.03383Z"
              fill="black"
            />
          </svg>
        </div>
      </Wrapper>
      <MobileNavBar />
    </>
  );
};

export default NavBar;
