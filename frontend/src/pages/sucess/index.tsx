import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import onlineShopping from '../../assets/onlineShopping.svg';

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;

  .illustration {
    display: flex;
  }

  .action {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .action__title {
    font-size: 36px;
    font-weight: 700;
  }

  .action__subtitle {
    margin-top: 8px;
    font-size: 24px;
    font-weight: 400;
  }

  .action__btn {
    margin-top: 40px;
    background-color: #fca311;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Sucess = () => {
  const route = useRouter();

  const returnHome = () => {
    route.push('/');
  };

  return (
    <Wrapper>
      <div className="illustration">
        <Image alt="illustration" src={onlineShopping} />
      </div>
      <div className="action">
        <h1 className="action__title">Agora é só aguardar!</h1>
        <h2 className="action_subtitle">Seu pedido chegará logo.</h2>
        <button className="action__btn" onClick={returnHome}>
          Ir para o início
        </button>
      </div>
    </Wrapper>
  );
};

export default Sucess;
