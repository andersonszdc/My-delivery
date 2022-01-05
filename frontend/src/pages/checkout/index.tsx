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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIASHABLE_KEY!
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  box-shadow: 1px 1px 2px 0px #7d7d7d, -1px -1px 2px 0px #ffffff;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: 600;
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
          <Button onClick={ReturnClick}>
            <div>
              <Image alt="icon" src={leftArrow} />
            </div>
            <span>Voltar</span>
          </Button>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </Wrapper>
      )}
    </div>
  );
};

export default Checkout;
