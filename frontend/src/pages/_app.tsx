import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ComponentType } from "react";
import { OrderContextProvider } from "../contexts/OrderContext";
import Global from '../styles/global'

type Page = NextPage & {
  layout?: ComponentType
}

type Props = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: Props) {
  const CustomLayout = Component.layout ? Component.layout : React.Fragment
  return (
    <>
      <OrderContextProvider>
        <Global />
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      </OrderContextProvider>
    </>
  )
}

export default MyApp
