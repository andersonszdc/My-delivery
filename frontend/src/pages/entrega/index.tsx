import React from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

const Entrega = () => {
  return (
    <>
      <Head>
        <title>Casa do Barbecue</title>
        <meta name="description" content="Site delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>entrega</div>
    </>
  );
}

Entrega.layout = Layout;

export default Entrega;