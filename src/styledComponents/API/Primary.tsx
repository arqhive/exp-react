import styled from 'styled-components';

// attr props과 styled props 은 서로 다른 인터페이스임
const Input = styled.input.attrs((props: any) => ({
  type: 'text',
  size: props.small ? 5 : undefined,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 1em;
  padding: ${(props: any) => props.padding};

  ::placeholder {
    color: palevioletred;
  }
`

// DOM이나 React Element에 전달하지 않고 prop으로 사용하려면 앞에 $를 붙인다.
const Comp = styled.div`
  color: ${(props: { $draggable: string }) =>
    props.$draggable || 'black'};
`;

const MyComponent = () => {
  return (
    <Comp $draggable={"red"}>
      Drag me!
    </Comp>
  )
}

// 또는 withConfig 의 shouldForwardProp을 이용해 처리하기
const Comp2 = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['hidden'].includes(prop) && defaultValidatorFn(prop),
}).attrs({ className: 'foo' })`
  // ...styles
`;
