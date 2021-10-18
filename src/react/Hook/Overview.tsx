import React from 'react';

function Example() {
  const [count, setCount] = React.useState(0); // setState와 달리 이전 state와 합치지 않음
  const ref = React.useRef<string | undefined>();
  // 초기 state가 고비용이 들어간다면 아래처럼 사용할수 있음
  const [someState, setSomeState] = React.useState(() => {
    const initialState = 2 + 2;
    return initialState;
  })

  // componentDidMount, componentDidUpdate와 같은 방식으로
  // 렌더링 '후'에 어떤일을 수행햐는지
  // 관심사별로 여러개의 useEffect를 사용하자
  // 클래스에서는 componentDidUpdate로 구독상태를 계속 관리해줘야하는 반면
  // hook에서는 그렇지 않아도 된다.
  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]) // 2번째 파라미터는 해당 값이 변경된 경우에만 effect를 발생시키라고 말한다. (첫 렌더링에는 effect가 무조건 발생한다.)

  React.useEffect(() => {
    ref.current = 'some value';
  })

  // 모든 DOM 변경 후 동기적으로 발생한다.
  // DOM을 변경해야 하거나 측정을 수행해야하는 경우 (진지하게 대부분은 useEffect로 해결됨)
  React.useLayoutEffect(() => {
    // 하나의 특별한 경우 ref를 확인하고 싶을때
    console.log(ref.current); // useEffect가 먼저 발생하므로 여기서는 값이 있다.
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
