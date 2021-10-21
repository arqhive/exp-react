/* Mutation */
import { gql, useMutation } from '@apollo/client';

// 뮤테이션 정의
const INCREMENT_COUNTER = gql`
  # 백엔드의 카운터를 증가시키고 그 값을 반환받는 뮤테이션
  mutation IncrementCounter {
    currentValue
  }
`

function MyComponent() {
  // useMutation은 실행 함수를 반환함 (자동으로 실행안됨.. 당연하지만..)
  const [mutateFunction, { data, loading, error }] = useMutation(INCREMENT_COUNTER);
}

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`

const GET_POST = gql`
  query GetTodo() {
    todo {
      id
      text
    }
  }
`

function AddTodo() {
  let input: any;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, ({
    variables: {
      text: 'placeholder', // 옵션에 직접 값을 설정할수 있다. 아래의 뮤테이트 펑션과 같이쓰면 값은 얕게 병합되고 우선순위는 뮤테이트 펑션이 값이 가진다.
    },
    errorPolicy: 'none', // 에러 정책
    refetchQueries: [ // 뮤테이션 후에 변경된 값을 반영하기 위해 다시 실행할 쿼리
      GET_POST,      // 실행할 쿼리
      'GetComments', //  이전에 실행한 쿼리의 이름을 문자열로 (이름으로 쿼리를 참조하려면 각 쿼리에 고유한 이름이 있어야 함)
    ],
    update(cache, { data: { addTodo } }) { // 뮤테이션 후에 캐시를 직접 업데이트 하기 (초보는 쿼리 다시 실행 권장)
      // cache.writeQuery()
      // cache.writeFragment()
      // cache.readQuery();
      // cache.readFragment(); ### 캐시 함수들
      // # 가비지 관련 api
      // cache.gc({
      //     resetResultCache: true,
      //     resetResultIdentities: true,
      // }); 캐시 정리
      // cache.retain('my-object-id') // 가비지 수집 방지
      // cache.release('my-object-id') // 가비지 수집
      // cache.evict({ id: 'my-object-id', filedName: 'someFieldName' }); 정규화된 객체 제거

      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `
            });
            return [...existingTodos, newTodoRef];
          }
        }
      })
    },
    // update 함수에서 복제가 잘못되는 경우 영향을 받는 활성 쿼리를 다시 가져와 함수의 수정 사항을 다시 확인 할수 있다.
    // onQueryUpdated(observableQuery) { // 쿼리 업데이트후 실행할 함수
    //   // 커스텀 로직을 만들어 쿼리의 변경점이 있으면 refetch
    //   if (someCustomLogic(observableQuery)) {
    //     return observableQuery.refetch(); // 이게 아니면 다른 반환값 필요없음 다시 가져온 쿼리의 응답이 update 함수의 수정 사항과 다른 경우 캐시와 UI가 모두 자동으로 다시 업데이트 된다.
    //   }
    // },
    onCompleted: (data) => { },
    onError: (error) => { },
    awaitRefetchQueries: true, // true 인경우 뮤테이션이 완료된 것으로 간주되기 전에 refetchQuries에 포함된 모든 쿼리가 완료되었는지 확인한다. 기본값은 false (비동기식으로 쿼리 다시 가져옴)
    ignoreResults: true, // true 인 경우 뮤테이션 데이터 속성이 뮤테이션 결과로 업데이트 되지 않는다. 기본값은 false
    notifyOnNetworkStatusChange: true, // true 인경우 네트워크 상태가 변경되거나 오류가 발생할때 진행중인 뮤테이션 관련 요소가 다시 렌더링 됨 기본 false
    // client: ApolloClient 인스턴스
    // context : Apollo Link를 사용할때 사용
    // optimisticResponse: Object // 이 값이 제공된 경우 뮤테이션이 완료될 때까지 이 값을 캐시하여 더 반응적인 UI 업데이트를 사용한다
    fetchPolicy: 'network-only', // useMutation 은 no-cache, network-only 만 있음
  }));

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { text: input.value } }); // 또는 뮤테이트 펑션 파라미터로 추가한다.
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}