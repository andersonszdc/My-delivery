import React from 'react';
import Image from 'next/image';
import imgLogo from '../assets/img-logo.png';
import imgCupom from '../assets/img-cupom.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 24px;
  border-radius: 16px;
  justify-content: space-between;
  box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
  margin: 24px 0;

  .store-infos {
    display: flex;
    gap: 16px;
  }

  .store-logo {
    width: 115px;
    height: 115px;
    border-radius: 75px;
    overflow: hidden;
  }

  .store {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .store-name {
    font-size: 24px;
    font-weight: 500;
  }

  .store-adress {
    font-size: 12px;
    font-weight: 500;
  }

  .delivery {
    display: inline-flex;
    justify-content: space-between;
    gap: 60px;
  }

  .info-label {
    font-size: 12px;
    font-weight: 400;
  }

  .info-answer {
    font-size: 12px;
    font-weight: 500;
  }

  .spacer {
    content: '';
    width: 0.5px;
    height: auto;
    background-color: #868686;
  }

  .store-voucher {
    width: 411px;
  }

  .delivery-seeMore {
    display: none;
  }

  .btn-seeMore {
    color: #ff7a00;
    border: none;
    font-size: 12px;
  }

  @media (max-width: 1100px) {
    gap: 32px;
    flex-direction: column;

    .spacer {
      display: none;
    }

    .delivery {
      justify-content: left;
      gap: 60px;
    }

    .store-voucher {
      width: 100%;
    }
  }

  @media (max-width: 606px) {
    gap: 24px;
    padding: 0;
    box-shadow: none;

    .delivery-info:not(:first-child) {
      display: none;
    }

    .store-logo {
      width: 75px;
      height: 75px;
    }

    .store-adress {
      display: none;
    }

    .delivery {
      gap: 12px;
    }

    .delivery-seeMore {
      display: block;
    }
  }

  @media (max-width: 500px) {
    .store-logo {
      width: 75px;
    }
  }

  @media (max-width: 500px) {
    .store-name {
      font-size: 18px;
    }
  }

  @media (max-width: 330px) {
    .delivery {
      flex-direction: column;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <div className="store-infos">
        <div className="store-logo">
          <Image alt="" layout="responsive" src={imgLogo} />
        </div>
        <div className="store">
          <div>
            <h1 className="store-name">Casa do Barbecue</h1>
            <h3 className="store-adress">Rua Morumbi, 123 - São Paulo</h3>
          </div>
          <div className="delivery">
            <div className="delivery-info">
              <h2 className="info-label">Tempo de entrega</h2>
              <h3 className="info-answer">30 - 50 min</h3>
            </div>
            <div className="delivery-info">
              <h2 className="info-label">Taxa de entrega</h2>
              <h3 className="info-answer">R$ 5,00</h3>
            </div>
            <div className="delivery-info">
              <h2 className="info-label">Aberto</h2>
              <h3 className="info-answer">Até 21:00</h3>
            </div>
            <div className="delivery-seeMore">
              <button className="btn-seeMore">Ver mais</button>
            </div>
          </div>
        </div>
      </div>
      <span className="spacer" />
      <div className="store-voucher">
        <Image alt="" layout="responsive" priority src={imgCupom} />
      </div>
    </Wrapper>
  );
};

export default Header;
