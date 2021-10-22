import 'styled-components';

// DefaultTheme 확장하기
declare module 'styled-components' {
  export interface DefaultTheme {
    color: string;
  }
}