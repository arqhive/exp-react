import React, { useEffect } from 'react';

// Hook 에서 이전값을 알아내기
function Counter() {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now, {count}, before: {prevCount}</h1>
}

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


// DOM 노드 측정 (콜백 ref를 이용)
function Measure() {
  const [rect, ref] = useClientRect;

  return (
    <h1 ref={ref}>Hello, World</h1>
  )
}

function useClientRect() {
   const [rect, setRect] = React.useState(null);
  const ref = React.useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

// 종속성 목록에서 함수를 생략하지 않기
function ProductPage({ productId }) {
  const [product, setProduct] = React.useState(null);

  useEffect(() => {
    // 이 함수 컴포넌트를 effect 내부로 이동하면 사용하는 값을 명확하게 볼 수 있습니다.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ 효과는 productId 만 사용하므로 유효합니다
  // ...
}