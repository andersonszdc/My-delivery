import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import Menu from '../components/Menu';

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
`

interface itemProps {
    name: string,
    price: number
}

interface menuProps {
  menu: itemProps[]
  data: any
}

const Home = ({data}: menuProps) => {
  console.log(data)
  return (
    <Wrapper>
      <Head>
        <title>Casa do Barbecue</title>
        <meta name="description" content="Site delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data ? (
        <Menu products={data.products} />
      ) : (
        <div>nao</div>
      )}
      <Cart hasButton={true} />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`)
    const data = await res.json()

    return {
      props: { data }
    }
  } catch (err) {

    return {
      props: { data: null }
    }
  }
}

Home.layout = Layout;

export default Home
