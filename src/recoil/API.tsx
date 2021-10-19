import { atom, DefaultValue, isRecoilValue, RecoilRoot, selector, useRecoilState, useRecoilStateLoadable, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

// RecoilRoot
// 값들은 갖는 atoms context 제공
function Root() {
  return (
    <RecoilRoot>
      <div>This is Recoil Root!</div>
    </RecoilRoot>
  )
}

// atom
// Recoil의 상태를 표현한다. 쓰기 가능한 RecoilState 객체를 반환한다.
const state = atom({
  key: 'uniqueKey', // 내부적으로 atom을 식별하는데 사용되는 고유한 문자열. selector, atom 사이의 유일해야 한다.
  default: 1, // 초깃값 또는 Promise 또는 동일한 타입의 값을 나타내는 다른 atom 이나 selector
  dangerouslyAllowMutability: false, // true 인경우 atom값이 변경되는 경우 컴포넌트에 알리지 않고 상태가 변경될 수 있다.
})

// selector
// 함수나 파생된 상태를 나타낸다. get 함수면 제공되면 RecoilValueReadOnly 객체를 반환하고, set 또한 제공되면 RecoilState를 반환한다.
const derivedState = selector({
  key: 'uniqueSelectorKey',
  get: ({ get }) => { // 파생된 상태의 값을 평가하는 함수. 값을 직접 반환하거나 비동기 Promise, atom 이나 selector를 반환할수 있다.
    return get(state);
  },
  set: ({ get, set, reset }, newValue) => {
    const currentState = get(state); // get은 다른 atom이나 selector 값을 찾는데 사용된다.
    set(state, newValue instanceof DefaultValue ? newValue : newValue as number + 1); // 값을 설정할때 사용되는 함수, 첫번째 파라미터는 Recoil State 두번째 파라미터는 새로운 값이다.
    reset(state); // RecoilState를 초깃값으로 설정한다.
  },
  dangerouslyAllowMutability: false,
})


const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue as number * 9) / 5 + 32),
});

function TempCelsius() {

  // useRecoilState(state: RecoilState) -> useRecoilValue + useSetRecoilState 합쳐졌다고 생각
  // state는 atom 혹은 set이 구현된 selector
  // 첫 요소가 값이고 두번째 요소가 호출되면 setter함수인 튜플을 반환한다 (useState와 비슷)
  // 컴포넌트가 상태를 읽고 쓰려고 할 때 사용한다.
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const addTenCelsius = () => setTempC(tempC as number + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  // useRecoilValue(state: RecoilState)
  // 읽기 전용, 쓰기 가능 상태에서 모두 동작한다.
  // 컴포넌트가 상태를 readonly와 같이 사용할때 사용한다.
  const readOnlyTempfF = useRecoilValue(tempFahrenheit);

  // useSetRecoilState(state: RecoilState)
  // 쓰기 가능한 상태만 파라미터로 받고 setter를 리턴한다.
  // 쓰기만 할때 사용한다.
  const writeOnlySetTempF = useSetRecoilState(tempFahrenheit);
  writeOnlySetTempF(150);

  // useResetRecoilState
  // RecoilState를 reset 한다.
  const resetList = useResetRecoilState(tempFahrenheit);


  return (
    <button onClick={resetList}>Reset TempF</button>
  )
}

// useRecoilStateLoadable(state) (setter를 제외하고 값만 가져올때는 useRecoilValueLodable(state))
// useRecoilState와 다르게 React Suspense와 함께 작동하기 위해 Error 혹은 Promise를 던지지 않는다.
// 대신 Lodable 객체를 setter 콜백과 함께 리턴한다.
function UserInfo({ userID }: { userID: string }) {
  const [userNameLoadable, setUserName] = useRecoilStateLoadable(tempCelsius);
  switch (userNameLoadable.state) { // 'hasValue' 'loading' 'hasError' 를 갖는다
    // contents는 Lodable이 나타내는 값이다. hasError면 Error 객체를 가지고 있다. 'loading'이면 Promise를 가지고 있다.
    case 'hasValue':
      // return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}

// isRecoilValue(value)
// 값이 atom이나 selector인지 확인
const result = isRecoilValue(tempFahrenheit); // true