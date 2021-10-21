import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// gql과 템플릿 리터럴로 쿼리문을 래핑한다.
const EXCHANGE_RATES = gql`
 query GetExchangesRates {
   rates(currency: "USD") {
     currency
     rate
   }
 }
`

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io', // GraphQl 서버의 URL
  cache: new InMemoryCache({
    addTypename: true, // true 인경우 캐시는 자동적으로 필드에 __typenamed을 추가한다. 즉 수동으로 추가할 필요가 없다 기본값 true
    resultCaching: true, // true 인경우 기본 데이터가 변경되지 않는 한 동일한 쿼리를 실행할때마다 동일한 응답 객체를 반환한다. 기본값 true
    // possibleTypes 스키마 유형간의 다형성 관계를 정의하려면 사용한다. https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    typePolicies: {
      Product: { // Product 타입은 upc를 식별 필드로 사용한다.
        keyFields: ['upc'],
      },
      Person: { // 콤비네이션 키필드
       keyFields: ["name", "email"],
      },
      Book: { // 키필드중 하나가 자체 필드가 있는 객체인 경우 중첩된 문자열 배열을 사용하여 중첩된 키필드를 포함한다.
        keyFields: ['title', 'author', ['name']]
      },
      AllProducts: {
        keyFields: [], // 식별 필드가 없는 싱글톤 타입은 공백을 사용할수 있다.
        // 루트쿼리에서 커스텀 __typename을 사용하는 경우 아래필드를 true로 설정해 해당 타입으로 사용됨을 알림
        queryType: true,
        mutationType: true,
        subscriptionType: true,
        fields: { // https://www.apollographql.com/docs/react/caching/cache-field-behavior/
          name: {
            read(name) {
              // name을 읽을때 무슨일을 할것인가~ 캐시가 해당 필드를 읽을때마다 처리할 함수
            }
          },
          tasks: {
            // 필드에 값이 들어올때 해당 함수가 호출된다. 일반적으로 배열 합치기
            merge(exsiting = [], incoming: any[]) {
              return [...exsiting, ...incoming];
            }
          }
        }
      }
    } //타입별로 캐시의 동작을 커스텀하려면 사용한다. 
  }), // Apollo Client가 쿼리 결과를 가져온 후 캐시하는데 사용하는 인스턴스
  credentials: 'same-origin', // 자격 증명 기본값 same-origin(동일한 origin인 경우 자격증명), omit(자격 증명 안함), include(cross origin 에도 항상 자격증명),
   headers: {
    'client-name': 'WidgetX Ecom [web]',
    'client-version': '1.0.0'
  },
  // link
  name: 'custom name',
  version: 'custom version',
  ssrMode: true, // default false
  ssrForceFetchDelay: 100, // (default 0) ssr후 쿼리페치 딜레이
  connectToDevTools: true,  // default false
  queryDeduplication: false, // default true false이면 동일한 쿼리가 이미 실행중이더라도 생성된 모든 쿼리를 서버로 보냄
  defaultOptions: { // 기본 옵션
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
});

// cache 관련 client API (반환값을 직접 수정하면 안됨)
client.readQuery({
  query: EXCHANGE_RATES,
  variables: {
    id: 5,
  }
})
// 캐시 변경사항은 서버에 푸시되지 않음 (다른 조치가 필요함) 변경값은 덮어씌워지고 남은건 보존됨
client.writeQuery({
  query: gql`
    query WriteTodo($id: Int!) {
      todo(id: $id) {
        id
        text
        completed
      }
    }
  `,
  data: {
    todo: {
      __typename: 'Todo',
      id: 5,
      text: '포도사기',
      completed: false,
    }
  },
  variables: {
    id: 5,
  }
})

const todo = client.readFragment({
  id: 'Todo:5', // The value of the to-do item's cache ID
  fragment: gql`
    fragment MyTodo on Todo {
      id
      text
      completed
    }
  `,
});

client.writeFragment({
  id: 'Todo:5',
  fragment: gql`
    fragment MyTodo on Todo {
      completed
    }
  `,
  data: {
    completed: true,
  },
});



// fetching 관련 client API
const refetchQuriesResult = client.refetchQueries({
  // updateCache
  // include 다시 가져올 쿼리를 지정하는 배열 또는 예약어 'all', 'active'
  // onQueryUpdated 
  // optimistic

})
const { queries, results } = refetchQuriesResult;

// const mutateResult = client.mutate({
//   // refetchQueries
//   // update
//   // onQueryUpdated
//   // awaitRefetchQueries
// })

// client로 query를 직접 실행할수 있음
const clientPromise = () => client.query({
  query: gql`
    query GetRates {
      rates(currency: "USD") {
        currency
      }
    }
  `
}).then(result => console.log(result));

// expected output
// {
//   data: {
//     currency: [...]
//   },
//   networkStatus: number
// }



function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>

  return data.rates.map(({ currency, rate }: { currency: string, rate: string }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ))
}


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>My first Apollo App</h1>
      </div>
      <ExchangeRates />
    </ApolloProvider>
  )
}

export default App;