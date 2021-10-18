import React from 'react';

// ref 전달은 컴포넌트를 통해 자식 중 하나에 ref를 자동으로 전달하는 기법이다.

type ButtonProps = JSX.IntrinsicElements['button']; // 이 타입은 생략해도 됨

const FancyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))

const ref = React.createRef<HTMLButtonElement>();
<FancyButton ref={ref}>Click me!</FancyButton>

// 이제 ref.current 는 button DOM 가리킨다.