import React from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

const Contato = () => {
  return (
    <>
      <Head>
        <title>Casa do Barbecue</title>
        <meta name="description" content="Site delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>contato</div>
    </>
  );
}

Contato.layout = Layout;

export default Contato;