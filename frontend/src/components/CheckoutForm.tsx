import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Form = styled.form`
  width: 30vw;
  min-width: 500px;
  align-self: center;
  border-top: 0.5px solid #0000001a;
  padding-top: 24px;

  .payment-element {
    margin-bottom: 24px;
  }

  .payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }
`;

const SendButton = styled.button`
  transition: all 0.2s ease;
  width: 100%;
  background-color: #ff7a00;
  border: none;
  font-weight: 700;
  color: #ffffff;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  padding: 12px;
  font-size: 16px;
  font-family: 'Roboto';

  :hover {
    filter: contrast(115%);
  }

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  color: #ffffff;
  border-radius: 50%;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  transform: translateZ(0);

  :before,
  :after {
    border-radius: 50%;
    position: absolute;
    content: '';
  }

  :before {
    width: 10.4px;
    height: 20.4px;
    background: #ff7a00;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    transform-origin: 10.4px 10.2px;
    animation: ${loading} 2s infinite ease 1.5s;
  }

  :after {
    width: 10.4px;
    height: 10.2px;
    background: #ff7a00;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    transform-origin: 0px 10.2px;
    animation: ${loading} 2s infinite ease;
  }
`;

const Index = ({clientSecret}: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not sucessful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [clientSecret, stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/sucess`,
      },
    });

    if (error.type) {
      setMessage(error.message!);
    }

    setIsLoading(false);
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement className="payment-element" />
      <SendButton disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <Spinner /> : 'Concluir'}</span>
      </SendButton>
      {message && <div className="payment-message">{message}</div>}
    </Form>
  );
};

export default Index;
