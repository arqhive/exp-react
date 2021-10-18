import React, { forwardRef } from 'react';

// 함수 컴포넌트에서 ref를 지원

function TextInputWithFocusButton() {
  const inputEl = React.useRef(null); // 순수 자바스크립트 객체 생성
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

function ParentComponent() {
  // inputRef라는 동아줄을 만들어서 자식에게 보낸다
  const inputRef = useRef();
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.realllyFocus()}>포커스</button>
    </>
  )
}

function FancyInput(props, ref) {
  // 부모가 내려준 동아줄 ref에다가 이것 저것 작업을 한다
  // 부모는 이 로직에 대해 모르고, 위로 끌어올리지 않고도 그냥 ref.current로 접근하여 사용만 하면 된다
  React.useImperativeHandle(ref, () => ({
    reallyFocus: () => {
      ref.current.focus();
      console.log('Being focused!')
    }
  }));
  // ref는 input을 참조하고 있다. 
  return <input ref={ref} />
}
 
// ref를 컴포넌트에 달 때는 forwardRef로 감싼다
FancyInput = forwardRef(FancyInput)
