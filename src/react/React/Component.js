import React from 'react';

// 순서
// constructor -> componentDidMount -> render -> (componentDidUpdate) -> componentWillUnmount

class Greeting extends React.Component {
  // 메서드를 바인딩하거나 state를 초기화 하는 작업이 없다면 구현하지 않아도 된다.
  // 내부에서 setState를 호출하면 안됨
  // this.state를 할당할수 있는 유일한 곳이다.
  constructor(props) {
    super(props); // 가장 먼저 작성되어야 함
    this.state = {
      counter: 0,
      color: props.color, // props를 복사하지 말것!! (props에 값이 바뀌어도 state에 반영되지 않음)
    }
  }

  componentDidMount() {
    // 마운트된 직후 호출된다.
    // 네트워크 요청을 보내기 적절한 위치이다.
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 리렌더링이 일어난 직후 호출된다. 최초에는 호출되지 않는다.
    if (this.props.userId !== prevProps.userId) {
      this.fechData(this.props.userId);
    }
  }

  componentWillUnmount() {
    // 마운트 해체 직전에 호출된다.
    // 타이머 제거, 네트워크 요청 취소, 구독 해제 등의 정리작업을 수행한다.
  }

  shouldComponentUpdate(nextProps, nextState) {
    // false를 반환하는 경우 update 되지않음 (render와  compomentDidUpdate가 호출되지 않음)
    // true를 반환하는 경우 update 함
    // 초기 렌더링 및 forceUpdate에서는 호출되지 않음
    // 깊은 객체 동일성 검사나 JSON.stringify()를 사용하는 것은 권장하지 않는다.
  }

  static getDerivedStateFromProps(props, state) {
    // 최초 마운트시 와 갱신시 render 메서드 호출 직전에 호출된다.
    // state를 갱신하기 위한 객체를 반환하거나 null을 반환하여 아무것도 갱신 안할수도 있다.
    // 잘 사용되지 않고 componentDidUpdate, Memoization, 완전제어 또는 완전비제어 컴포넌트로 제어하는것을 권장한다.
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 가장 마지막으로 렌더링된 결과가 DOM등에 반영되었을때 호출된다.
    // 스크롤 위치등과 같은 정보를 변경되지 전에 얻을수 있다.
    // 이 메서드가 반환하는 값은 componentDidUpdate()에 인자로 전달된다.
  }

  static getDerivedStateFromError(error) {
    // ErrorBoundary 참고
    // 갱신된 state값을 반드시 반환해야 한다.
    // 사이드 이펙트를 생성하면 안됨 (componentDidCatch에서 할것) (render단계에서 호출되므로)
  }

  componentDidCatch(error, info) {
    // ErrorBoundary 참고
    // 사이드 이펙트를 생성해도 됨 (커밋 단계에서 실행되므로)
  }

  handleSetState() {
    // setState는 즉각적으로 실행되는게 아니라 요청이라고 생각해야 한다.
    // setState가 즉시 적용되는 것을 보장하지 않는다.

    // 이런 문제는 componentDidUpdate나 콜백형식의 setState를 사용한다.
    this.setState((state, props) => {
      return { counter: state.counter + props.step };
    })

    // 렌더링을 무조건 다시 수행하도록 만든다.
    this.forceUpdate();
  }

  // render() 는 반드시 구현해야 하는 유일한 메서드 이다.
  // React Element, Array 및 Fragmnet, Portal, Number 와 String, Boolean 또는 null을 반환한다.
  render() {
    return (
      <div>Hi Class</div>
    )
  }
}

// 클래스 프로퍼티

// props 기본값 설정
Greeting.defaultProps = {
  colod: 'blue',
}

// 디버깅용 이름 (보통 이미 설정되있어서 굳이 지정할 필요 없음)
Greeting.displayName = 'Greeting'

// 인스턴스 프로퍼티
// props, state