import React, { useReducer } from 'react';

// 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나
// 다음 state가 이전 state에 의존적인 경우 useReducer가 선호된다.
// 객체 또는 배열을 관리할떄는 useReducer가 더 좋음 (예측가능한 상태 전환을 제공하므로)

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}

// 초기화 지연
function init(initialCount) {
  return { count: initialCount };
}


function reducer2(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter2({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init); // reducer 외부에서 초기state를 계산하는 로직을 추출
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount })} // 추가적으로 초기화 설정도 할수있음
      >
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}