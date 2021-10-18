import React from 'react';

// 의존성이 간단한 프리미티브 값일때 사용하는 것이 좋음 Object.is 비교는 객체는 무조건 다르기 떄문
// 메모이제이션된 콜백 
const callback = React.useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// 메모이제이션된 값
const value = React.useMemo(() => comptetExpensiveValue(a, b), [a, b]);