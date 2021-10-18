import React, { useContext } from 'react';

// 함수 컴포넌트에서 Context를 사용하기 위한 hook
// useContext 파라미터는 context 객체 자체여야 한다.
// useContext(MyContext) 는 static contextType = MyContext 또는 MyContext.consumer와 같다.

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props: any) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Context~
    </button>
  )
}