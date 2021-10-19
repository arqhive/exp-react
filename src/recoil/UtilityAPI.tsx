import { atom, atomFamily, noWait, selector, selectorFamily, useGotoRecoilSnapshot, useRecoilCallback, useRecoilSnapshot, waitForAll, waitForNone } from "recoil";

// atomFamily는 atom과 거의 유사하지만 기본값을 파라미터화 할수 있다. 
const defaultBasedOnParam = (param: number) => param + 1;

// 하나의 atom 이지만 컴포넌트가 각각 자신의 값으로 구독할수 있다. (일종의 팩토리 atom 같은 느낌)
const myAtomFamily = atomFamily({
  key: 'MyAtom',
  default: (param: number) => defaultBasedOnParam(param),
  // selectorFamily를 사용하면 default selector 에서도 파라미터에 접근할수 있다.
  // default: selectorFamily({
  //   key: 'MyAtom/default',
  //   get: (param) => ({ get }) => {
  //     return defaultBasedOnParam(param);
  //   }
  // })
})

const myNumberState = atom({
  key: 'MyNumber',
  default: 2,
});

// selector와의 차이점은 get 및 set에 콜백 함수를 전달할 수 있는 것이다.
const myMultipliedState = selectorFamily({
  key: 'MyMultipliedNumber',
  get: (multiplier) => ({get}) => {
    return get(myNumberState) * (multiplier as number);
  },

  // optional set
  set: (multiplier: number) => ({get, reset, set}, newValue: any) => {
    set(myNumberState, newValue / multiplier);
  },
});

// constSeletor(constant: T) 항상 상수를 반환
// errorSelector(message: string) 항상 에러를 반환

// noWait
// 현재 상태에 대한 Lodable 객체를 만환단다.
// 에러가 존재하거나 종속이 아직 보류중인 경우 에러를 발생시키지 않고 잠재적인 비동기 종속의 현재 상태를 가져온다.
const myQuery = selector({
  key: 'MyQuery',
  get: ({get}) => {
    const loadable = get(noWait(dbQuerySelector));

    return {
      hasValue: {data: loadable.contents},
      hasError: {error: loadable.contents},
      loading: {data: 'placeholder while loading'},
    }[loadable.state];
  }
})

// waitForAll
// Promise.all 과 유사하게 사용한다.
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friends = get(waitForAll(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friends;
  },
});

// waitForNone
// waitForAll과 유사하지만 값을 반환하지 않고 각각의 Lodable을 반환함
function MyChart({layerQueries}: {layerQueries: Array<RecoilValue<Layer>>}) {
  const layerLoadables = useRecoilValue(waitForNone(layerQueries));

  return (
    <Chart>
      {layerLoadables.map((layerLoadable, i) => {
        switch (layerLoadable.state) {
          case 'hasValue':
            return <Layer key={i} data={layerLoadable.contents} />;
          case 'hasError':
            return <LayerErrorBadge key={i} error={layerLoadable.contents} />;
          case 'loading':
            return <LayerWithSpinner key={i} />;
        }
      })}
    </Chart>
  );
}

// waitForSettled
// waitForNone과 유사하지만 로드상태에서는 대기함

// waitForAny (Promise.any와 유사)


// 그외 스냅샷 어쩌구저쩌구
useRecoilCallback();
useRecoilSnapshot();
useGotoRecoilSnapshot();