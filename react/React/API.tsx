import React from 'react';

// React.Component
// ES6 class를 사용하여 React 컴포넌트를 정의할 때 기초가 되는 class

class Greeting extends React.Component {
  render() {
    return <h1>Hello, Arahive</h1>
  }
}

// React.PureComponent
// shouldComponentUpdate 를 구현해 prop와 state를 이용한 얕은 비교를 구현한다.
class PureGreeting extends React.PureComponent {
  render() {
    return <h1>Hello, PureComponent</h1>
  }
}

// 객체가 React 엘리먼트인지 확인
React.isValidElement(Greeting); // true

// 불투명 자료구조인 this.props.children을 다루는 API

// 자식이 배열인 경우 자식마다 function을 통과시킴 배열을 반환
React.Children.map(children, function[(thisArg)]);

// React.Children.map과 비슷하지만 배열을 반환하지 않음
React.Children.forEach(children, function[(thisArg)]);

// children에 포함된 컴포넌트의 개수 반환
React.Children.count(children);

// children이 단하나의 자식을 갖는지 확인하고 해당 엘리먼트 반환
React.Children.only(children);

// key가 할당된 배열을 children 불투명 자료구조로 반환. 하위로 children을 전달하기 전에 다시 정렬하거나 일부만 잘라낼때 유용
React.Children.toArray(children);

// 그외
React.Fragment
React.createRef()
React.forwardRef()
React.lazy()
React.Suspense()