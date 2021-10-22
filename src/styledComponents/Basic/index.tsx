import React, { ReactElement } from 'react';
import { Title, Wrapper, Button, ButtonWithoutInterpolations, TomatoButton, LinkButton, ReversedButton, Input, Thing, Thing2, Thing3, GlobalStyle, Input2, Rotate } from './Basic';

function App(): ReactElement {
  /* 컴포넌트 내부에서 스타일 컴포넌트를 정의하지 말것. 재생성되며 캐싱이 방해를 받음 */

  return (
    <Wrapper>
      <Title>Hello Styled Components</Title>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
      <ButtonWithoutInterpolations>Nomarl Button</ButtonWithoutInterpolations>
      <TomatoButton>Tomato</TomatoButton>
      {/* as attribute를 이용해 다른 태그로 동적으로 교체할 수 있다. */}
      <LinkButton as="a" href="#">Link with Button Styles</LinkButton>
      <Button as={ReversedButton}>Custom Button with Normal Button Styles</Button>
      {/* HTML 어트리뷰트는 DOM으로 전달되고 그렇지 않으면 props로 처리 */}
      <Input defaultValue="@probablyup" type="text" inputColor="rebeccapurple" />
      <Thing>Hello World!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
      <Thing2>
        <label htmlFor="foo-button" className="something">Mystery button</label>
        <Button id="foo-button">What do i do?</Button>
      </Thing2>
      <GlobalStyle />
      <Thing3>I'm a blue</Thing3>
      <Input2 placeholder="A bigger text input" size="2em" />
      <Rotate>&lt; 💅🏾 &gt;</Rotate>
    </Wrapper>
  );
}

export default App;
