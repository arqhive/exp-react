

// Default Theme 확장하기
// styled.d.ts 참고

import React from "react";
import styled from "styled-components";

interface TitleProps {
  readonly isActive: boolean;
}

// props가 있는 컴포넌트
const Title = styled.h1<TitleProps>`
  color: ${props => props.isActive ? 'red' : 'white'};
`;

interface LogoProps {
  className?: string;
}

class Logo extends React.Component<LogoProps, {}> {
  render() {
    return <div className={this.props.className}>Logo</div>;
  }
}

// StyledComponent<typeof Logo>
const LogoStyled = styled(Logo)`
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 1.8rem;
`;

interface BoxProps {
  theme?: any;
  borders?: boolean;
  className?: string;
}

// 함수형 컴포넌트는 타입과함께 Props를 전달해야함 (파라미터에 타입을 지정하면 StyledComponent가 인식못함 이건 리액트가 이렇게 동작하기 때문임)
const Box: React.FunctionComponent<BoxProps> = (props) => <div className={props.className}>{props.children}</div>;

// StyledComponent<React.FunctionComponent<BoxProps>>
const StyledBox = styled(Box)`
  padding: ${(props) => props.theme.lateralPadding};
`;