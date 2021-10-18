import React from 'react';


function onRenderCallback(
  id: string, // 방금 커밋된 Profiler 트리의 "id"
  phase: string, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
  actualDuration: number, // 커밋된 업데이트를 렌더링하는데 걸린 시간
  baseDuration: number, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간 
  startTime: number, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
  commitTime: number, // React가 해당 업데이트를 언제 커밋했는지
  interactions: any, // 이 업데이트에 해당하는 상호작용들의 집합
) {
  // 렌더링 타이밍을 집합하거나 로그...
  console.log('트리거한 프로파일러 ID', id);
  console.log('트리 상태', phase);
  console.log('Profiler 및 자식 컴포넌트들을 렌더링하는데 걸린 시간', actualDuration);
  console.log('메모제이션 없이 하위 트리 전체를 렌더링하는 걸리는 예상시간', baseDuration);
  console.log('해당 업데이트를 렌더링한 시작 Timestamp', startTime);
  console.log('해당 업데이트를 렌더링 커밋한  Timestamp', commitTime);
  console.log('이 업데이트에 해당하는 상호작용의 집합 Set<Interaction>', interactions);
}

class Inner extends React.Component {
  render() {
    return (
      <div>
        <p>Hello, Profiler</p>
      </div>
    )
  }
}

class Profiler extends React.Component {
  render() {
    return (
      <React.Profiler id="Test" onRender={onRenderCallback}>
        <Inner />
      </React.Profiler>
    )
  }
}

export default Profiler;