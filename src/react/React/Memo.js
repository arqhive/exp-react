import React from 'react';

// React.memo는 HOC 이다. 
// 호출결과를 메모이징 하도록 래핑하여 경우에 따라 성능 향상을 누릴수 있다.
// props 변화에만 영향을 주므로 Functional Component에 사용한다.
// props와 props간 얕은 비교를 수행한다.

// 기본적으로 memo가 적용되지 않는이유
// 1. React는 이미 렌더링 성능을 최적화는데 매우 효울적이다.
// 2. props 가 자주 변경되는 경우 (이전 props를 비교하는데 추가 오버헤드가 생김)
// 3. 너무 큰 컴포넌트를 래핑하면 메모리가 더 소요된다.

// React.memo()를 사용하는 경우
// 1. 순수한 함수 컴포넌트인 경우 (같은 prop 같은 output)
// 2. 렌더링이 종종 발생하는 경우
// 3. 리렌더링이 같은 prop으로 발생하는 경우
// 4. 컴포넌트 내에 동일 props 검사를 추론하는 상당한 양의 UI가 포함되어 있는 경우

// 프로파일링을 통해 React.memo를 적용한경우, 그렇지 않은경우를 비교해서 좋은걸 적용하기


export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  )
}

// memo의 두번째 파라미터로 비교함수를 전달해 prop을 세부적으로 비교할수 있다.
function moviePropsAreEqual(prevMovie, nextMovie) {
  // 결과가 true인 경우 다시 렌더링 하지 않음 (SOC와 반대)
  return prevMovie.title === nextMovie.title && prevMovie.releaseDate === nextMovie.releaseDate;
}

export const MemoizedMovie = React.memo(Movie, moviePropsAreEqual);

// 처음 렌더링 때는 MemoizedMovie가 호출됨
{/* <MemoizedMovie title="Heat" releaseDate="December 15, 1995" /> */}

// 두번째 부터는 호출되지 않음
{/* <MemoizedMovie title="Heat" releaseDate="December 15, 1995" /> */}



// 콜백 함수는 ??
function Logout({ username, onLogout }) {
  return (
    <div onClick={onLogout}>
      Logout {username}
    </div>
  )
}

const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  // 메모이제이션을 유지하기 위해 useCallback 을 사용하자
  const onLogout = React.useCallback(() => cookies.clear('session'), [cookies]);

  return (
    <div className="main">
      <header>
        <MemoizedLogout
          username={store.username}
          // onLogout={() => cookies.clear('session')} // 매번 다른 함수의 인스턴스를 제공하므로 메모이제이션이 깨짐
          onLogout={onLogout} // useCallback이 동일한 인스턴스를 반환하므로 메모이제이션이 깨지지 않는다.
        />
      </header>
      {store.content}
    </div>
  );
}