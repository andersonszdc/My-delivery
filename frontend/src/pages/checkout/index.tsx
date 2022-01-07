import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderContext from '../../contexts/OrderContext';
import CheckoutForm from '../../components/CheckoutForm';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import leftArrow from '../../assets/leftArrow.svg';
import Image from 'next/image';
import logo from '../../assets/logo.png';
import Cart from '../../components/Cart';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIASHABLE_KEY!
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const CREATE_PAYMENT = gql`
  mutation createPaymentIntent($items: String) {
    createPaymentIntent(items: $items)
  }
`;

const Checkout = () => {
  const route = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const { state } = useContext(OrderContext);

  const [createPayment, { data, loading, error }] = useMutation(CREATE_PAYMENT);

  useEffect(() => {
    createPayment({
      variables: {
        items: 'pizza',
      },
    });
  }, [createPayment]);

  useEffect(() => {
    data && setClientSecret(data.createPaymentIntent);
  }, [data]);

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  const appearance = {
    theme: undefined,
    variables: {
      colorPrimary: '#FF7A00',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const ReturnClick = () => {
    route.back();
  };

  return (
    <div>
      {clientSecret && (
        <Wrapper>
          <Header onClick={ReturnClick}>
            <Image alt="logo" src={logo} />
          </Header>
          <hr className="divider-solid" />
          <div className="content">
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
            <div>
              <Cart isCheckout={true} />
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default Checkout;
