import React, { ReactElement } from 'react';
import MyComponent from './react/Ref/Ref';

// JSX는 ReactElement를 반환한다.
// JSX도 expression 이다. 정규 함수 호출이 되고 객체로 인식된다.

function App(): ReactElement {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

export default App;
