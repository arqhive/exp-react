import React from 'react';

/**
 * UI의 일부분에 존재하는 자바스크립트 에러가 전체 애플리케이션을 중단시켜선 안된다
 * Error Boundary는 하위 컴포넌트 트리의 어디에서든 자바스크립트 에러를 기록하면 깨진 컴포넌트 트리 
 * 대신 fallback UI를 보여준다.
 * 
 * 다음 에러는 포착되지 않음
 * - 이벤트 핸들러 (UI를 조작하는 메서드나 함수등....) ( try / catch 를 사용)
 * - 비동기 코드 (setTimeout, requestAnimationFrame 콜백)
 * - 서버 사이드 렌더링
 * - Error Boundary 자체에서 나는 에러
 */

interface Props { }
interface State {
  hasError: boolean;
}

// 클래스 컴포넌트만이 Error Boundary로 사용될 수 있다.
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    }
  }

  // 다음 두 Life Cycle API 중 하나만 구현하면 ErrorBoundary가 된다.
  
  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 fallback UI가 보이도록 상태를 업데이트 한다.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러가 발생했을시 기록이나 처리등을 작성한다.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return <h1>Nothing happend</h1>
  }
}

export default ErrorBoundary;