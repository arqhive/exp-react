import { gql, InMemoryCache, makeVar, useReactiveVar } from '@apollo/client';

// 아폴로 상태관리
// 캐시랑 로컬스토리지를 통해 하라는 뜻 (아폴로 에서는)

const PRODUCT_DETAILS = gql`
  query ProductDetails($productId: ID!) {
    product(id: $productId) {
      name
      price
      isInCart @client # 이것은 클라이언트가 임의로 설정한 필드이다.
    }
  }
`

// 임의로 설정한 필드를 typePolicy를 통해 어떻게 설정할건지 캐시에 설정
const cache = new InMemoryCache({
  typePolicies: { 
    Product: {
      fields: { 
        isInCart: { 
          read(_, { variables }) { 
            return localStorage.getItem('CART').includes( // localStorage CART에 해당 productId가 있으면 inInCart는 truerㅏ 된다.
              variables.productId
            );
          }
        }
      }
    }
  }
});

// Reactive Varaibles
// 애플리케이션 어디서나 반응 변수를 읽고 수정할수 있음
// 변수값이 변경되면 모든 활성 쿼리가 자동으로 새로 고쳐짐
const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client # 로컬에 있다고 가정한다.
  }
`;

const cartItemsVar = makeVar([]); // 반응 변수 초기화 값이 아니라 함수임

export const cache2 = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar(); // 타입 정책을 써주고 (쿼리될때마다 변수값을 반환함)
          }
        }
      }
    }
  }
});

function AddToCartButton({ productId }) {
  return (
    <div className="add-to-cart-button">
      <button onClick={() => cartItemsVar([...cartItemsVar(), productId])}>
        Add to Cart
      </button>
    </div>
  );
}

export function Cart() {
  const { data, loading, error } = useQuery(GET_CART_ITEMS); // 변수가 바뀔때마다 자동으로 호출됨

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div class="cart">
      <Header>My Cart</Header>
      {data && data.cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <Fragment>
          {data && data.cartItems.map(productId => (
            <CartItem key={productId} />
          ))}
        </Fragment>
      )}
    </div>
  );
}

export function Cart2() {
  const cartItems = useReactiveVar(cartItemsVar); // useQuery대신 해당 hook을 사용할수 있음

  return (
    <div class="cart">
      <Header>My Cart</Header>
      {cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <Fragment>
          {cartItems.map(productId => (
            <CartItem key={productId} />
          ))}
        </Fragment>
      )}
    </div>
  );
}


// 캐시에 직접쓰기 (마찬가지로 모든 활성쿼리가 다시 실행됨)
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

// 로컬 필드를 내보내기
const GET_CURRENT_AUTHOR_POST_COUNT = gql`
  query CurrentAuthorPostCount($authorId: Int!) {
    currentAuthorId @client @export(as: "authorId") # export는 client와 함께 사용되어야 한다.
    postCount(authorId: $authorId)
  }
`;