import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderContext from '../../contexts/OrderContext';
import PaymentForm from '../../components/PaymentForm';
import AdressForm from '../../components/AdressForm';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';
import Cart from '../../components/Cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIASHABLE_KEY!);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const Button = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  box-shadow: 1px 1px 2px 0px #7D7D7D, -1px -1px 2px 0px #FFFFFF;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: 600;
`

const Checkout = () => {

  const route = useRouter()
  const [clientSecret, setClientSecret] = useState('')
  const {state} = useContext(OrderContext)

  useEffect(() => {

    fetch("/api/payment", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.total)
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))

  },[state])

  const appearance = {
    theme: undefined,
    variables: {
      colorPrimary: '#FF7A00',
    }
  }

  const options = {
    clientSecret,
    appearance
  }


  const ReturnClick = () => {
    route.back()
  }

  return (
    <div>
      <Head>
        <title>Casa do Barbecue</title>
        <meta name="description" content="Site delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {clientSecret && (
        <Wrapper>
          <div> 
            <Button onClick={ReturnClick}>
              <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.772992 6.34153L6.03921 1.04275C6.40319 0.676506 6.99177 0.676506 7.35189 1.04275L8.22701 1.92328C8.591 2.28952 8.591 2.88174 8.22701 3.24408L4.49419 6.99999L8.22701 10.7559C8.591 11.1221 8.591 11.7143 8.22701 12.0767L7.35189 12.9572C6.9879 13.3235 6.39932 13.3235 6.03921 12.9572L0.772992 7.65844C0.409003 7.29999 0.409003 6.70777 0.772992 6.34153Z" fill="black"/>
              </svg>
              <span>Voltar</span>
            </Button>
            <AdressForm />
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
          <div>
            <Cart/>
          </div>
        </Wrapper>
      )}
    </div>
  );
}

export default Checkout;