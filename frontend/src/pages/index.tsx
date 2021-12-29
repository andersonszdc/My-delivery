import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useQuery, gql } from '@apollo/client';

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
`;

interface itemProps {
  name: string;
  price: number;
}

interface menuProps {
  menu: itemProps[];
  data: any;
}

const PRODUCTS = gql`
  query Products {
    products {
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(PRODUCTS);
  data && console.log(data);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  return <div>sucess</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
    const data = await res.json();

    return {
      props: { data },
    };
  } catch (err) {
    return {
      props: { data: null },
    };
  }
};

Home.layout = Layout;

export default Home;
