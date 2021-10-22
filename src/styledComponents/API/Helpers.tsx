import styled, { createGlobalStyle, css, isStyledComponent, keyframes, StyleSheetManager, ThemeProvider } from "styled-components";

// Global Style
// 전역 스타일 생성
const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props: any) => props.theme.color};
  }
`

function AppWithGlobalStyle() {
  return (
    <ThemeProvider theme={{ color: 'red' }}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

// css 
// css 문자열 자체를 생성해낸다.
const flexMixin = css`
  display: flex;
  flex-direction: row;
`

const StyledComp = styled.div`
  ${(props: any) => props.flex ? flexMixin : 'display: block'};
`

// keyframes
// 애니메이션에 사용할 키프레임 모델 반환
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opaicty: 1;
  }
`

// const animation = (props: any) => css`
//   ${fadeIn} ${props.animationLength} infinite alternate;
// `


// const PulseButton = styled.button`
//   animation: ${animation};
// `

// StyleSheetManager
// StyleSheet 설정 래퍼 컴포넌트

const Box = styled.div`
  color: 'red';
  display: flex;
`

const WillRenderBox = () => (
  <StyleSheetManager disableVendorPrefixes disableCSSOMInjection stylisPlugins={[]}>
    <Box>StyleSheetManater를 disalbeVendorPrefixes와 사용하면 벤더 접두사가 생기지 않는다.</Box>
    <Box>타사 스타일 API와 병행해서 사용하는 경우 disableCSSOMInjection을 고려할수 있다.</Box>
    <Box>컴파일 하는 동안 실행될 플러그인을 stylisPlugins에 넣을수 있다.</Box> {/* https://www.npmjs.com/search?q=keywords%3Astylis */}
  </StyleSheetManager>
)

// isStyledComponent
// 스타일이 적용된 컴포넌트인지 확인
const isStyledBox = isStyledComponent(Box);

// withTheme
// theme 적용 HOC

// ThemeContext
// ThemeProvider가 있으니 당연히 ThemeContext가 있다 (자동으로 theme prop으로 들어오므로 특별한 이유가 있을때 사용한다.)