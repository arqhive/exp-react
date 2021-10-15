import React, { ComponentType, ReactElement } from 'react';

interface Props { }
interface State { }

// redner prop 이란 React 컴포넌트 간에 코드를 공유하기 위해 함수 props를 이용하는 테크닉이다.
// 무엇을 렌더링 할지 컴포넌트에 알려주는 함수이다.

// 횡단 관심사를 위한 render props 사용법
// 마우스 트래커를 구현한 컴포넌트를 어떤 컴포넌트에서든 사용할 수 있게 만들어보자

interface Props {
  render: (state: State) => ReactElement;
 }
interface State { x: number, y: number  }

class Mouse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event: React.MouseEvent) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신,
          `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있다.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  // 만약 Mouse가 PureComponent 라면 prop 넘어가는 함수가 계속 생성되므로 아래처럼 메서드를 정의해서 render로 넘겨준다
  // render 어트리뷰트가 같은 함수를 참조한다.
  renderTheComponent(mouse: { x: number, y: number }) {
    return <div><p>{mouse.x} {mouse.y}</p></div>
  }

  render() {
    return (
      <div>
        <h1>Move the mouse aournd!</h1>
        <Mouse render={mouse => (
          <div><p>{mouse.x} {mouse.y}</p></div>
        )} />
        {/* 혹은 render 어트리뷰트가 아니라 직접 꽂아넣어도 된다. 자주 사용하는 패턴은 아님 별도의 children 타입 지정 필요 */}
        {/* <Mouse>
          {mouse => <div><p>{mouse.x} {mouse.y}</p></div>}
        </Mouse> */}
        <Mouse render={this.renderTheComponent} />
      </div>
    )
  }
}

// render props + with HOC
// 어떤 이유 때문에 HOC를 만들기 원한다면, 쉽게 구현할 수 있습니다.
// T: props를 의미한다.
function withMouse<T extends object>(Component: ComponentType<T>) {
  return class extends React.Component<T> {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}