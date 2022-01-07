import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadersRing = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loaders = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #ff7a00;
    border-radius: 50%;
    animation: ${LoadersRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ff7a00 transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Index = () => {
  return (
    <Loaders>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Loaders>
  );
};

export default Index;
