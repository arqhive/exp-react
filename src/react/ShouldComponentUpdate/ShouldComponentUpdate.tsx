import React from 'react';

interface Props {
  color: string;
}

interface State {
  count: number;
}

class CounterButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 1,
    }
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // 이전 props.color가 다음 props.color와 다르면 리렌더링
    if (this.props.color !== nextProps.color) {
      return true;
    }

    // 이전 state.count가 다음 state.count와 다르면 리 렌더링
    if (this.state.count !== nextState.count) {
      return true;
    }

    // 그렇지 않으면 리렌더링 하지 않음
    return false;
  }

  render() {
    return (
      <button color={this.props.color} onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
        Count: {this.state.count}
      </button>
    )
  }
}

// PureComponent를 상속하면 shouldComponentUpdate를 구현하지 않아도 됨
class PCounterButton extends React.PureComponent<Props, State> {
   constructor(props: Props) {
    super(props);
    this.state = {
      count: 1,
    }
  };

  render() {
    return (
      <button color={this.props.color} onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
        Count: {this.state.count}
      </button>
    )
  }
}

// shouldComponentUpdate 나 PureComponent는 얕은 비교만 하기 때문에 깊은 비교가 필요한 경우에는 사용할 수 없다.

interface LOWProps {
  words: string[];
}

interface WAProps { }
interface WAState {
  words: string[],
}

class ListOfWords extends React.PureComponent<LOWProps, {}> {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component<WAProps, WAState> {
  constructor(props: WAProps) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const words = this.state.words;
    // words.push('marklar'); // words를 변경시켰으므로 이전 값과 새로운 값이 동일하게 비교되어 코드가 작동하지 않음
    // this.setState({words: words});
    // 아래처럼 작성해서 이 문제를 피하기
    this.setState(state => ({
      words: state.words.concat(['marklar']),
    }))

    // 객체라면 Object.assign()을 사용하기 (또는 스프레드)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}