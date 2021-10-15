import React from 'react';

// 엘리먼트 혹은 컴포넌트의 직접 접근하는 방법 (객체의 프로토타입을 직접 만지는 느낌)
// 함수 컴포넌트는 인스턴스가 없어서 ref 어트리뷰트를 사용할 수 없다.

// 16.3 부터는 콜백ref 보다 React.createRef()를 사용하자
// 왜?
// ref 콜백은 업데이트 과정 중에 처음에는 null로 그 다음에는 DOM 엘리먼트로 총 두번 호출된다.
// 매 렌더링 마다 콜백의 새 인스턴스가 생성되기 때문이다. (하지만 별 문제가 되진 않는다고 공식문서에 써있음)

interface Props { }
interface State { }

// 함수 컴포넌트에서는 useRef 훅을 사용한다.

class CustomTextInput extends React.Component<Props, State> {
  // 컴포넌트가 마운트될때 current 프로퍼티에 DOM 엘리먼트를 할당한다.
  // 컴포넌트가 언마운트 될때 currnet를 다시 null로 되돌린다.
  textInput: React.RefObject<HTMLInputElement>; // 타입 지정 잘 보기

  constructor(props: Props) {
    super(props);
    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성한다. ref객체의 기본형태는 { current: null } 이다.
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current?.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} /> 
        <input
          type="button"
          value="Focus the text input"
        />
      </div>
    );
  }
}

export default CustomTextInput;