import React from 'react';
import { RecoilRoot, atom, useRecoilState, selector, useRecoilValue } from 'recoil';


// Atom
// Atom은 state의 일부를 나타낸다. 어떤 컴포넌트에서나 읽고 쓸 수 있다.
// atom의 값을 사용하는 컴포넌트들은 암묵적으로 atom을 구독한다. 
// atom에 어떤 변화가 있으면 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생한다.
const textState = atom({
  key: 'textState', // atoms/selectors 사이의 유일한 ID
  default: '', // aka initial value
})

// Selector
// Selector는 derived state의 일부를 나타낸다. 파생된 상태는 상태의 변화다.
// 파생된 상태를 어떤 방법으로든 주어진 상태를 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.
const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  }
})

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  )
}

function TextInput() {
  // 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 사용한다.
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  )
}


function CharacterCount() {
  // selector의 값을 가져오기 위해서는 useRecoilValue() 를 사용한다.
  const count = useRecoilValue(charCountState); 
  return <p>Character Count: {count}</p>
}


// recoil 상태를 사용하는 컴포넌트는 부모 트리에 RecoilRoot가 필요하다.
function App() {
  // 비동기 recoil state를 사용하는 경우 에러나 빈값을 대체하기 위해 React.Suspense 사용
  // 비동기 에러를 잡기위해 ErrorBoundary 사용
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CharacterCounter />
      </React.Suspense>
    </RecoilRoot>
  )
}

export default App;