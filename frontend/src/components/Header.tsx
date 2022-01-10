import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logoPng from '../assets/logo.png';
import accountIcon from '../assets/account.svg';
import bagIcon from '../assets/bag.svg';
import logoutIcon from '../assets/logout.svg';
import downArrowIcon from '../assets/downArrow.svg';
import Portal from '../HOC/Portal';
import Cart from './Cart';

const stores = ['Bangu', 'Realengo'];

type SelectedProps = {
  isOpenMenu: boolean;
};

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
  .navbar-icon {
    cursor: pointer;
  }
`;

const CustomSelect = styled.div`
  position: relative;
`;

const Selected = styled.div<SelectedProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;

  .arrow {
    transform: rotate(0deg);
    transition: 0.3s ease-in-out;
    ${(props) =>
      props.isOpenMenu &&
      `
      transform: rotate(180deg);
    `}
  }
`;

const DropdownMenu = styled.div`
  z-index: 1;
  background-color: #fff;
  border: 1px solid #cecdcd;
  position: absolute;
  top: 32px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 4px;

  .menu__item {
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 500;
    border: none;
    background-color: #fff;
    text-align: start;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    :hover {
      background-color: #ccc;
    }
  }
`;

const Index = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [store, setStore] = useState(stores[0]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const CustomSelectRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const clickOption = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setStore((e.target as HTMLInputElement).defaultValue);
    setIsOpenMenu(false);
  };

  const clickSelected = (e: any) => {
    setIsOpenMenu((s) => (s ? false : true));
  };

  const clickOut = (e: any) => {
    if (!CustomSelectRef.current?.contains(e.target)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, [CustomSelectRef]);

  return (
    <>
      <Wrapper>
        <div>
          <Image alt="logo" src={logoPng} />
        </div>
        <div>
          <p>LOJA</p>
          <CustomSelect ref={CustomSelectRef}>
            <Selected isOpenMenu={isOpenMenu} onClick={clickSelected}>
              {store}
              <Image className="arrow" alt="icon" src={downArrowIcon} />
            </Selected>
            {isOpenMenu && (
              <DropdownMenu>
                {stores.map((store, index) => (
                  <input
                    type="submit"
                    value={store}
                    onClick={clickOption}
                    className="menu__item"
                    key={index}
                  />
                ))}
              </DropdownMenu>
            )}
          </CustomSelect>
        </div>
        <div>
          <p>ENTREGAR EM</p>
          <div>{'Estr. São Pedro de Alcântara, 446'}</div>
        </div>
        <div className="navbar">
          <Image className="navbar-icon" alt="icon" src={accountIcon} />
          <Image
            className="navbar-icon"
            onClick={openModal}
            alt="icon"
            src={bagIcon}
          />
          <Image className="navbar-icon" alt="icon" src={logoutIcon} />
        </div>
      </Wrapper>

      {isOpenModal && (
        <Portal modal="cartModal">
          <Cart setIsOpenModal={setIsOpenModal} />
        </Portal>
      )}
    </>
  );
};

export default Index;
