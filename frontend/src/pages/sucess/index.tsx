import { useRouter } from 'next/router';
import React from 'react';

const Sucess = () => {

  const route = useRouter()

  const returnHome = () => {
    route.push('/')
  }

  return (
    <>
      <div>Pedido realizado!</div>
      <button onClick={returnHome}>Ir para o início</button>
    </>
  );
}

export default Sucess;