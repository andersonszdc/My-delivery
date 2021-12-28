import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Portal from '../HOC/Portal';
import ilustration from '../assets/img-logo.png';
import Image from 'next/image';

const WrapperAdress = styled.div`
  width: 30vw;
  min-width: 500px;
`;

const OrderType = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 16px;

  .btn-type {
    border: none;
    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
`;

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

const Form = styled.form`
  background-color: #efeeee;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-width: 500px;
  align-self: center;
  border-top: 0.5px solid #0000001a;
  padding-top: 24px;
  gap: 30px;

  .adress-title {
    font-size: 20px;
    font-weight: 600;
  }

  .adress-part {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 16px;
    font-weight: 400;
  }

  input {
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Quicksand';
    border: 1px solid #e6e6e6;
    :focus {
      outline: 0;
      border-color: hsla(29, 100%, 50%, 0.5);
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03),
        0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 3px hsla(29, 100%, 50%, 25%),
        0 1px 1px 0 rgba(0, 0, 0, 0.08);
    }
  }

  .btn-send {
    background-color: #ff7a00;
    border: none;
    font-weight: 700;
    color: #ffffff;
    border-radius: 12px;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;

const AdressInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  // justify-content: space-between;

  .adress-img {
    width: 50px;
    margin-right: 12px;
  }

  .adress-rua {
    font-weight: 600;
    font-size: 16px;
  }

  .adress-complemento {
    font-weight: 600;
    font-size: 14px;
    color: #00000099;
  }

  .btn-switch {
    cursor: pointer;
    border: none;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Quicksand';
    color: #ff7a00;
    margin-left: 16px;
  }
`;

const AdressForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [adress, setAdress] = useState({
    rua: '',
    complemento: '',
    bairro: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAdress((s) => ({
      ...s,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    setIsClicked(false);
  };

  const switchAdress = () => {
    setIsClicked(true);
  };

  const OutsideClick = (e: any) => {
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes('Wrapper')
    ) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (!adress.rua) {
      setIsClicked(true);
    }
  }, [adress]);

  return (
    <>
      <WrapperAdress>
        <OrderType>
          <button className="btn-type">Entrega</button>
          <button className="btn-type">Retirada</button>
        </OrderType>
        <AdressInfo>
          <div className="adress-img">
            <Image src={ilustration} alt="" />
          </div>
          <div>
            <h2 className="adress-rua">
              {adress.rua || 'Rua Apolinário, 123'}
            </h2>
            <h3 className="adress-complemento">
              {adress.complemento || 'Ap 105'} - {adress.bairro || 'Deodoro'}
            </h3>
          </div>
          <div>
            <button className="btn-switch" onClick={switchAdress}>
              trocar
            </button>
          </div>
        </AdressInfo>
      </WrapperAdress>
      {isClicked && (
        <Portal>
          <Wrapper onClick={OutsideClick}>
            <Form onSubmit={handleSubmit}>
              <label className="adress-title">Diga-nos o seu endereço!</label>
              <div className="adress-part">
                <label htmlFor="">Endereço</label>
                <input
                  onChange={handleChange}
                  name="rua"
                  value={adress.rua}
                  type="text"
                  placeholder="Rua Apolinário, 123"
                />
              </div>
              <div className="adress-part">
                <label htmlFor="">Complemento</label>
                <input
                  onChange={handleChange}
                  name="complemento"
                  value={adress.complemento}
                  type="text"
                  placeholder="Ap 105"
                />
              </div>
              <div className="adress-part">
                <label htmlFor="">Bairro</label>
                <input
                  onChange={handleChange}
                  name="bairro"
                  value={adress.bairro}
                  type="text"
                  placeholder="Deodoro"
                />
              </div>
              <input
                className="btn-send"
                type="submit"
                value="Salvar endereço"
              />
            </Form>
          </Wrapper>
        </Portal>
      )}
    </>
  );
};

export default AdressForm;
