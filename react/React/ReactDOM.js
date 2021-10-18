import React from 'react';
import ReactDOM from 'react-dom';

// CSR 에서는
ReactDOM.render()

// SSR 에서는 (서버에서 내려온 HTML에 이벤트리스너를 부착함)
ReactDOM.hydrate()

// DOM 제거
ReactDOM.unmountComponentAtNode(container);

// 사용할 필요가 전혀 없음 함수컴포넌트 사용 불가
ReactDOM.findDOMNode(component);

// 포탈 생성
ReactDOM.createPortal(child, container);