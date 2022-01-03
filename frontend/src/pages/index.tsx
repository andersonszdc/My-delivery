import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useQuery, gql } from '@apollo/client';
import { useSubscription } from '@apollo/client';
import Item from '../components/Item';

const Wrapper = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  gap: 16px;
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

const PRODUCT_ADDED = gql`
  subscription ProductAdded {
    productAdded {
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(PRODUCTS);
  // const added = useSubscription(PRODUCT_ADDED);

  data && console.log(data.products);

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  return <div>
    <Wrapper>
    {data.products.map((product: any, index: number) => (
      <Item key={index} item={product} />
    ))}
    </Wrapper>
  </div>;
};

Home.layout = Layout;

export default Home;
