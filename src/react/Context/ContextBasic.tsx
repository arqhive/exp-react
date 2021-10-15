import React from 'react';

/**
 * Context는 React 컴포넌트 트리 안에서 전역적이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법이다.
 * 예를들면 유저정보, 테마, 선호 언어등이 있다.
 * 
 * Context를 사용하면 prop drilling을 피할수 있다.
 * 
 * Context의 주된 용도는 다양한 레벨에 네스팅된 많은 컴포넌트에게 값을 전달하는 것이다
 * Context를 사용하면 컴포넌트를 재사용하기 어려워지므로 꼭 필요할 때만 쓴다
 */

// createContext를 사용해 context 객체를 생성한다.
// prop drilling을 발생시키지 않고 Context값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있다.
// 기본값으로 light를 주었다.
const ThemeContext = React.createContext<Theme>('light');
const StringContext = React.createContext('myString');

type Theme = 'dark' | 'light';

class App extends React.Component {
  render() {
    // Provider API를 이용해 하위 트리에 값을 보내준다
    // Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있다
    // value를 일반 리터럴값 (혹은 프리미티브) 로 제공하면 Provider가 렌더링될때마다 하위 컴포넌트가 모조리 리렌더링된다.
    // 이를 방지하기 위해 value를 state로 올린다. (ContextAdvanced 참고)
    return (
      <ThemeContext.Provider value="dark">
        <StringContext.Provider value="myString">
          <Toolbar />
        </StringContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

// 중간단계에 있는 컴포넌트가 prop을 일일이 넘겨줄 필요가 없다
function Toolbar() {
  return (
    <div>
      <ThemedButton />
      <ThemeButton2 />
    </div>
  )
}

class ThemedButton extends React.Component {
  // contextType API를 사용하면 하나의 context만 구독가능하다 (프로터이 하나만 할당할수 있으므로)

  // 해당 컨텍스트에 가장 가까이에 있는 프로바이더 값을 사용한다.
  // static contextType을 사용하게 되면 this.context에 값이 생긴다.
  static contextType = ThemeContext; // public class fields syntax
  render() {
    return <Button theme={this.context} />
  }
}
// 또는
ThemedButton.contextType = ThemeContext;

class ThemeButton2 extends React.Component {
  // Consumer API를 사용하면 여러개의 Context를 받을수 있다.
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <StringContext.Consumer>
            {str => <Button theme={theme} str={str}/> }
          </StringContext.Consumer>
        )}
      </ThemeContext.Consumer>

  
    )
  }
}

function Button({ theme, str }: { theme:Theme, str?: string }) {
  return (
    <button type="button">Click me!</button>
  )
}

export default App;