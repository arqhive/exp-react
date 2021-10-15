import React from 'react';

/**
 * DOM에 별도 노드를 추가하지 않고 여러 자식을 그룹화할 수 있다.
 */

// 일반적으로 이런 상황이 있을 것이다.
function Columns() {
  // <div>로 감싸지 않고 Fragmanet 사용

  // key 어트리뷰트가 필요없으면 단축문법으로 쓸수 있다.
  const shorthandFragment = () => (
    <>
      <td>Shorthand</td>
      <td>Fragment</td>
    </>
  )

  return (
    <React.Fragment>
      <td>Hello</td>
      <td>Hello</td>
    </React.Fragment>
  )
}
