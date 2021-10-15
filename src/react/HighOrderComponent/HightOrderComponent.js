import React from 'react';

/**
 * 횡단 관심사 (Cross-Cutting Concerns에) 고차 컴포넌트 사용하기
 */

const DataSource = {
  getComments() { },
}

// 외부로부터 데이터를 구독하여 댓글 목록을 렌더링하는 컴포넌트
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comments: DataSource.getComments(),
    }
  }

  componentDidMount() {
    // 변화감지를 위한 리스너 추가
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments(),
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <p key={comment.id}>{comment.content}</p>
        ))}
      </div>
    )
  }
}

// 블로그 포스트를 구독하기 위한 컴포넌트
// 위 컴포넌트와 동일하진 않지만 컴포넌트가 하는일 자체는 비슷함
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <p>{this.state.blogPost}</p>
  }
}

// 패턴이 반복적으로 발생한다고 가정하면 추상화가 필요하다
// 이 경우 HOC가 필요

// 파라미터 컴포넌트를 절대로 수정하지 않는다. (프로토타입을 수정하면 재사용할수 없음)
function withSubscription(WrappedComponent, selectData) {
  // 유명 클래스로 만들어서 displayName 속성을 지정해 디버깅용도로 사용할수 있다.

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

     componentDidMount() {
      // ... 구독을 담당하고...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // render 내에서 고차컴포넌트를 사용하지 말것 (결과 컴포넌트가 계속 다르므로 마운트 해제 및 마운트가 반복적으로 발생)

      // 추가로 props를 내려준다. 이렇게 안하면 어트리뷰트를 인식 못함
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}