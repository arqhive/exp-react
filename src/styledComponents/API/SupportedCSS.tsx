import styled from "styled-components";

// 앰퍼샌드는 자기자신이다
const Example = styled.div`
  /* 모든 선언은 접두사가 자동으로 생성 된다 */
  padding: 2em 1em;
  background: papayawhip;

  /* 의사 선택기도 잘 작동한다 */
  &:hover {
    background: palevioletred;
  }

  /* 미디어 쿼리도 문제 없다 */
  @media (max-width: 600px) {
    background: tomato;

    /* 중첩 규칙도 예상되로 동작한다 */
    &:hover {
      background: yellow;
    }
  }

  > p {
    text-decoration: underline;
  }

  html.test & {
    display: none;
  }
`;