import React from 'react';

// HTML과 다른 어트리뷰트 (기본 camelCase)
// checked, className, htmlFor (for가 JS예약어기 때문에)

// innerHTML을 사용하기 위한 React의 방법
// __html키로 객체를 전달해야 한다.
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}