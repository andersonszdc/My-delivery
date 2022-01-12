import React, { useContext } from 'react';
import styled from 'styled-components';
import OrderContext from '../contexts/OrderContext';
import removeFromOrder from '../functions/removeFromOrder';

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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efeeee;
  border-radius: 8px;
  padding: 24px;
  gap: 24px;

  .label-sure {
    font-weight: 700;
    font-size: 18px;
  }

  .btns {
    display: flex;
    gap: 24px;
  }

  .btn-yes,
  .btn-no {
    padding: 8px 24px;
    border-radius: 8px;
    border: none;
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-yes {
    background-color: #ccc;
  }

  .btn-no {
    background-color: #ff7a00;
    color: white;
  }
`;

type IndexProps = {
  index: number;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const Index = ({ index, close }: IndexProps) => {
  const { state, setState } = useContext(OrderContext);

  const handleYes = () => {
    removeFromOrder({ state, setState, index });
    close(false);
  };

  const handleNo = () => {
    close(false);
  };

  const OutsideClick = (e: any) => {
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes('Wrapper')
    ) {
      close(false);
    }
  };

  return (
    <Wrapper onClick={OutsideClick}>
      <Content>
        <label className="label-sure">
          Deseja mesmo retirar este item do seu carrinho?
        </label>
        <div className="btns">
          <button onClick={handleYes} className="btn-yes">
            Sim
          </button>
          <button onClick={handleNo} className="btn-no">
            Não, manter
          </button>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Index;
