import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

// 약간의 스타일을 가진 h1 태그를 렌더링하는 Title Component
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// 약간의 스타일을 가진 section 태그를 렌더링하는 Wrapper Component
export const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

/* Adapting base on props */
interface ButtonProps {
  primary?: boolean;
}

// primary props 에 따라 변하는 Button Component
export const Button = styled.button<ButtonProps>`
  background: ${props => props.primary ? 'palevioletred' : ' white' };
  color: ${props => props.primary ? 'white' : 'palevioletred' };

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

/* Extending Styles */
export const ButtonWithoutInterpolations = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

// Button을 기반으로한 새로운 컴포넌트. 몇몇 스타일은 오버라이드 되었다.
export const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`

// 케이스에 따라 태그를 변환할수 있음 (index.tsx 에서 확인)
export const LinkButton = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`

interface ReversedButtonProps {
  children: string;
}

// 커스텀 컴포넌트를 as attribute에 넘길수 있음
export const ReversedButton = (props: ReversedButtonProps) => <Button {...props} children={props.children.split('').reverse()} />

/* Styling any component */
// 컴포넌트도 다시 styled-components로 랩핑할 수 있음
const WrappedReversedButton = styled(ReversedButton)`
  color: palevioletred;
  font-weight: bold;
`

interface InputProps {
  inputColor: string;
}

/* Passed Props */
// HTML input attribute는 DOM에 전달되고 그렇지 않으면 컴포넌트 props로 통과됨
export const Input = styled.input<InputProps>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

/* Pseudoelements, pseudoselectors, and nesting */
export const Thing = styled.div.attrs(() => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red; // <Thing> 이 hover 될때
  }

  & ~ & {
    background: tomato; // <Thing>이 다른<Thing>의 형제 일때, 하지만 바로 인접한건 아닐수 있음
  }

  & + & {
    background: lime; // <Thing> 바로 다음 <Thing>
  }
  
  &.something {
    background: orange; // class something이 있는 <Thing>
  }

  .something-else & {
    border: 1px solid; // something-else class 를 가진 엘리먼트 내의 <Thing>
  }
`

// 앰퍼샌드 없이 셀렉터를 넣으면 컴포넌트의 자식을 참조한다.
export const Thing2 = styled.div`
  color: blue;

  .something { // <Thing2> 내부에 something으로 라벨된 자식
    border :1px solid;
    display: block;
  }
`

// 앰퍼샌드 2개를 사용해서 규칙의 특수성을 높일수 있다.
export const Thing3 = styled.div`
  && {
    color: blue; // 글로벌로 red로 선언되어있지만 blue로 렌더링됨
  }
`

export const GlobalStyle = createGlobalStyle`
  div${Thing3} {
    color: red;
  }
`

interface Input2Props {
  size: string;
}

/* Attaching additional props */
// 컴포넌트가 장황해지는것을 막기 위해 attrs 생성자를 사용할수 있다.
export const Input2 = styled.input.attrs((props: Input2Props) => ({
  type: 'text', // 정적 props
  size: props.size || '1em', // 동적 props
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  margin: ${props => props.size};
  padding: ${props => props.size};
`

// attrs 재정의
const PasswordInput = styled(Input2).attrs({
  type: 'password',
})`
  border: 2px solid aqua;
`

/* Animations */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

// 키프레임은 느리게 주입되어서 프래그먼트를 공유하려면 css 헬퍼를 사용해야 한다.
const styles = css`
  animation: ${rotate} 2s linear infinite;
`