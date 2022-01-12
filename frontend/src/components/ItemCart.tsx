import React, { useContext, useState } from 'react';
import OrderContext from '../contexts/OrderContext';
import CurrencyConversion from '../utils/CurrencyConversion';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';
import ItemModal from './ItemModal';
import Portal from '../HOC/Portal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .item {
    display: flex;
    justify-content: space-between;
  }

  .action {
    display: flex;
    gap: 16px;
  }

  .action__btn {
    background-color: transparent;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  .action__btn-edit {
    color: #fca311;
  }

  .action__btn-remove {
    color: #979797;
  }
`;

type IndexProps = {
  item: any;
  index: number;
};

const Index = ({ item, index }: IndexProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenItemModal, setIsOpenItemModal] = useState(false);

  return (
    <>
      <Wrapper>
        <div className="item">
          <p className="item__name">
            {item.mount}x {item.name}
          </p>
          <p className="item__price">
            {CurrencyConversion(item.price * item.mount)}
          </p>
        </div>
        <div className="action">
          <button
            onClick={() => setIsOpenItemModal(true)}
            className="action__btn action__btn-edit"
          >
            Editar
          </button>
          <button
            onClick={() => setIsOpenDeleteModal(true)}
            className="action__btn action__btn-remove"
          >
            Remover
          </button>
        </div>
        <hr className="divider-solid" />
      </Wrapper>

      {isOpenItemModal && (
        <Portal modal="itemModal">
          <ItemModal item={item} setIsClicked={setIsOpenItemModal} />
        </Portal>
      )}

      {isOpenDeleteModal && (
        <DeleteModal index={index} close={setIsOpenDeleteModal} />
      )}
    </>
  );
};

export default Index;
