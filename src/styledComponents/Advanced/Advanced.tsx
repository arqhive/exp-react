import styled from "styled-components";


/* Theme */
interface ButtonProps {
  theme: {
    main: string;
  }
}

// theme prop이 있는 Button
// theme은 ThemeProvider를 통해 전달받음
export const Button = styled.button<ButtonProps>`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

Button.defaultProps = {
  theme: {
    margin: 'palevioletered',
  }
}

export const Button2 = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`

/* style objects */
// 자바스크립트 객체로 스타일을 작성할 수 있음
const Box = styled.div({
  backgroundColor: 'red',
  height: '50px',
  widht: '50px',
})

/* Referring to other components */
export const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;

export const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  ${Link}:hover & { // Link 가 Hover 됐을때 Icon은.. (이 동작은 Styled Compont 만 지원함 React Component는 안됨 : 하고 싶으면 먼저 styled(ReactComponent)로 만든뒤 하면 된다)
    fill: rebeccapurple;
  }
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;

  &::before {
    content: '◀';
    margin: 0 10px;
  }
`;