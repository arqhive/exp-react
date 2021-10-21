import { useQuery, gql, InMemoryCache, ApolloClient } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import { graphql } from "graphql";

const GET_DOGS = gql`
`

const client = new ApolloClient({
  uri: 'someuri',
  cache: new InMemoryCache(),
})

// 캐시 우회
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: 'no-cache', // 캐시에 쓰지 않고 캐시에서 데이터를 확인하지도 않음
})

// 캐시 유지
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: // someStorage
});

// 캐시 재설정이 필요한 경우
client.resetStore(); // 액티브 쿼리를 다시 가져옴
client.clearStore(); // 액티브 쿼리를 다시 안가져옴

