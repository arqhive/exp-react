/* Query */
import { gql, NetworkStatus, useLazyQuery, useQuery } from '@apollo/client';
// NeworkStatus
// loading = 1,
// setVariables = 2,
// fetchMore = 3,
// refetch = 4,
// poll = 6,
// ready = 7,
// error = 8

// 쿼리 선언
const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      bread
    }
  }
`

// 지원되는 fetch 정책
// cache-first : 캐시로 쿼리를 우선 실행하고, 캐시에 없으면 서버에 요청
// cache-only : 캐시로만 쿼리를 수행
// cache-and-network : 서버와 캐시 모두 쿼리를 수행하고 서버가 캐시를 수정하면 그 결과로 업데이트됨
// network-only : 캐시를 확인하지 않고 서버로만 쿼리를 수행함. 결과는 캐시에 저장됨
// no-cache : network-only 에서 캐시 저장을 뺀 정책
// standby : 기본 필드 값이 변경될때 쿼리가 자동으로 업데이트 되지 않는다는 점을 제외하고 cache-first와 동일하다.

// 지원되는 error 정책
// none : 오류가 있는경우 error.graphQlErrors가 응답 data로 설정된다. 기본 오류 정책이다.
// ignore : 오류가 무시된다. 오류가 발생하지 않은것처럼 렌더링 됨
// all : 모든 오류 정보가 채워짐

function Dog({ onDogSelected, breed }: any) {
  // useQuery를 이용해 쿼리 실행
  // useQuery는 컴포넌트가 마운트되면 자동으로 실행됨 (당연하지만)
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOGS, {
    variables: { breed }, // 쿼리에 전달되는 변수
    pollInterval: 500, // 500ms 간격으로 폴링함 (서버와 동기화) 0이면 실행하지 않음 (캐싱기법 1) 기본값 0
    notifyOnNetworkStatusChange: true, // true면 reftech가 진행되는 동안 컴포넌트가 리렌더링 되도록 한다  기본값 false
    fetchPolicy: 'network-only', // fetch 정책을 설정할수 있다. network-only는 캐시하지 않고 네트워크가 연결되어있으면 항상 fetch한다. 
    nextFetchPolicy: 'cache-first', // 다음 fetch 정책 이 프로퍼티가 있으면 fetchPolicy는 처음에만 그렇게 하고 다음번부터는 nextFetchPolicy로 한다.
    errorPolicy: 'none', // 에러 정책
    onCompleted: (data) => console.log('쿼리가 성공적일때 실행되는 콜백'),
    onError: (error) => console.log('쿼리가 실패했을때 실행되는 콜백'),
    skip: true, // true인 경우 쿼리가 실행되지 않음. useLazyQuery에서는 사용할 수 없음 기본값 false
    displayName: '개발자 도구에 표시될 이름 기본값 Query',
    // context Apollo Link를 사용하는경우 사용됨
    ssr: false, // false면 SSR 하는동안 쿼리를 실행하지 않음
    // client 쿼리를 실행할 Apollo Client 인스턴스. 다른 인스턴스를 제공할 수 있음
    returnPartialData: true // true 면 캐시에 쿼리의 모든 결과가 포함되어 있지면 부분결과만 반환한다. 기본값 false
  });

  if (networkStatus === NetworkStatus.refetch) return 'Refetch...'; // refech를 사용자에게 알리기 위한 UI
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog: any) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
      <button onClick={() => refetch({
        breed: 'dalmatian' // 새로운 변수로 refech 할수 있음 (optional)
      })}>캐싱기법2 다시 패치하기</button>
    </select>
  );
}

function DelayedQuery() {
  // useLazyQuery는 쿼리를 즉시 실행하지 않고 쿼리를 실행할수 있는 함수를 반환한다.
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOGS);

  const result = useQuery(GET_DOGS);
  // result 내용
  // data : 쿼리 결과
  // previousData : 최근 이전 실행 결과
  // error : 에러 내용 ApolloError
  // variables : 쿼리에 제공된 변수
  // loading : 쿼리 진행 상태 boolean
  // networkStatus : 쿼리와 연결된 요청 네트워크 상태 위의 내용 참고
  // client : 쿼리를 실행한 아폴로 클라이언트 인스턴스
  // called : useLazyQuery에만 있다. true면 지연쿼리가 실행된 것
  // refetch(variables?) : fetchPolicy에 맞게 refetch 하는 함수
  // fetchMore({ query?, variables? , updateQuery()? }) : 페이지네이션 다음 결과 집합을 가져오는데 도움이 되는 함수
  // startPolling(interval: number) : 폴링 지시 함수
  // stopPolling() : 폴링 멈춤 함수
  // subcribeToMore(options: { doucment, vairalbes?, updateQuery?, onError? }): 쿼리에 포함된 특정 필드를 구독하는 함수. 구독을 취소하는 함수를 반환한다.
  // updateQuery(previousResult, options: { variables }) : 다음 GQL 작업을 실행하지 않고 쿼리의 캐시된 결과를 업데이트 하는 함수

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      {data?.dog && <img src={data.dog.displayImage} />}
      {/* 버튼을 눌러서 쿼리를 실행한다. */}
      <button onClick={() => getDog({ variables: { breed: 'bulldog' } })}>
        Click me!
      </button>
    </div>
  );
}