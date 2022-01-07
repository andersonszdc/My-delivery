import styled from 'styled-components';
import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import { useSubscription } from '@apollo/client';
import Item from '../components/Item';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  gap: 16px;
`;

const WrapperLoader = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  width: 100%;
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
      description
      price
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

  if (loading)
    return (
      <WrapperLoader>
        <Loader />
      </WrapperLoader>
    );

  if (error) return <div>error</div>;

  return (
    <div>
      <Wrapper>
        {data.products.map((product: any, index: number) => (
          <Item key={index} item={product} />
        ))}
      </Wrapper>
    </div>
  );
};

Home.layout = Layout;

export default Home;
