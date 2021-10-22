import React from 'react';
import { ThemeProvider, withTheme, ThemeContext } from 'styled-components';
import { Button, Button2, Link, Icon, Label } from './Advanced';

const theme = {
  main: 'mediumseagreen',
}

const theme2 = {
  fg: 'palevioletred',
  bg: 'white',
}

// theme2의 fg와 bg 스왑
const invertTheme = ({ fg, bg }: {fg: string, bg: string }) => ({
  fg: bg,
  bg: fg,
})

// withTheme HOC로 테마를 전달할수 있다.
class ComponentWithTheme extends React.Component<{ theme: any }, {}> {

  render() {
    return (
      <div style={{ backgroundColor: this.props.theme.fg }} />
    )
  }
}

const withThemeClass = withTheme(ComponentWithTheme); // 가장 가까운 ThemeProvider의 theme 읽음

function App() {
  // Provider가 있으니 당연히 Context도 있음
  const themeContext = React.useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <Button>Button with theme</Button>
        <ThemeProvider theme={theme2}>
          <Button2>Default Theme</Button2>
            <ThemeProvider theme={invertTheme}>
          <Button2>Inverted Theme</Button2>
          <Button theme={theme}>Theme는 Override 된다</Button>
          <Link href="#">
            <Icon viewBox="0 0 20 20">
              <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z"/>
            </Icon>
            <Label>Hovering my parent changes my style!</Label>
          </Link>
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  )
}

export default App;