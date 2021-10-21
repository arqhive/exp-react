import { gql, InMemoryCache, useQuery } from "@apollo/client";

const FEED_QUERY = gql`
  query Feed($offset: Int, $limit: Int) {
    feed(offset: $offset, limit: $limit) {
      id
    }
  }
`

const FeedWithData = () => {
  // fetchMore는 후속 쿼리 결과를 원래 쿼리의 캐시된 결과와 자동으로 병합하지 않음
  const { loading, data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    }
  });

  return (
    <button onClick={() => fetchMore({
        variables: {
          offset: data.feed.length
        },
      })}>더 보기!!</button>
  )
}

// feed를 fetchMore 했을때 캐시에 필드 정책이 필요함
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          // 이 필드의 아규먼트를 기반으로 별도의 결과를 캐시하지 않음
          keyArgs: false, // [] 도 작동하지만 false 표현력이 더 뛰어나 캐시내에서 필드키가 더 깨끗해짐
          // 기존 목록과 머지한다.
          // merge(existing = [], incoming) {
          //   return [...existing, ...incoming];
          // },
          // 위 merge는 offset, limit 값을 무시하기 때문에 어떻게 병합될지 모름 
          // 아랫처럼 고도화
          merge(exisiting, incoming, { args: { offset = 0 } }) {
            const merged = exisiting ? exisiting.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
          read(existing, { args: { offset = 0, limit = existing?.length }}) {
            // 기존 항목이 정의되지 않은 경우 read 함수는 항상 정의되지 않은 값을 반환해야 합니다. 필드가 캐시에서 누락되었다는 정의되지 않은 신호를 반환하면 Apollo Client가 GraphQL 서버에서 값을 가져오도록 지시합니다.
            return existing && existing.slice(offset, offset + limit);
          },
        }
      }
    }
  }
})

// offset 기반 유틸리티에 대해 알고싶으면 https://www.apollographql.com/docs/react/pagination/offset-based/ (이 유틸리티는 merge를 자동으로 정의해줌)