import React from 'react';
import { ThemeContext, themes } from './themeContext';
import ThemedButton from './themedButton';

interface ToolbarProps {
  changeTheme: () => void;
}

interface Props { }
interface State {
  theme: {
    foreground: string;
    background: string;
  };
  toggleTheme: () => void;
}

// ThemedButton을 사용하는 중간 컴포넌트
function Toolbar(props: ToolbarProps) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Chanage Theme
    </ThemedButton>
  )
}

class App extends React.Component<Props, State> {
  toggleTheme: () => void;

  constructor(props: Props) {
    super(props);
       // theme 토글 메서드
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:  state.theme === themes.dark ? themes.light : themes.dark,
      }))
    }
    this.state = {
      theme: themes.light, // ThemeContext에 사용한 객체 값을 state에 담는다.
      toggleTheme: this.toggleTheme,
    } 
  }

  render() {
    // state로 부터 theme값을 읽으므로 state가 변경되면 Provider의 value가 변경된다.
    // themeToggle 메서드도 state로 부터 받는다.
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <Toolbar changeTheme={toggleTheme} />
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    )
  }
}

export default App;