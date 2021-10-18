import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOM.createPortal(child, container)
// DOM의 다른 위치에 자식을 삽입할때 사용한다.
// 다이얼로그, 호버카드, 툴팁 등..

// 형제 관계인 두 엘리먼트가 있다.
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

interface Props { }
interface State { }

class Modal extends React.Component<Props, State> {
  el: HTMLDivElement
  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Portal 엘리먼트는 Modal의 자식이 마운트된 후 DOM 트리에 삽입된다.
    modalRoot?.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot?.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extends React.Component<{}, { clicks: number }> {
  constructor(props: Props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Child에 있는 버튼이 클릭 되었을때 발생하고 Parent의 state를 갱신한다.
    // 버튼이 DOM 상에서 직계 자식이 아니라도 말이다.
    this.setState(state => ({
      clicks: state.clicks + 1,
    }))
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of Clicks: {this.state.clicks}</p>
        <p>
          브라우저 개발툴을 열어서 확인해 봅시다
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    )
  }
}

function Child() {
  // onClick 속성이 정의되지 않아서 클릭 이벤트가 부모로 버블링된다.
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  )
}