# EXP-REACT

## 추가 설정

### .vscode/launch.json

VSCode 내에서 디버깅을 할 수 있게 만드는 설정파일

### react devtools

```
yarn global add react-devtools (설치형)
yarn add --dev react-devtools (프로젝트 종속형)
npx react-devtools (인스턴트형)
```

### 접근성 보조 도구

- 접근성 테스트 [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)
- eslint-plugin-jsx-a11y (ESLint plugin)
- react-aria-modal (package)

### 코드 스플릿

- 기본적으로 동적 import()를 사용하면 Webpack이 앱의 코드를 분할한다.
- React.lazy() : 서버 사이드 렌더링 지원안함, default exports만 지원함 (SSR을 지원하고 싶다면 [lodable](https://github.com/gregberge/loadable-components))

### Router 설정

- [React Router](https://github.com/gregberge/loadable-components)

### 성능 최적화

긴 List는 가상화

windowing 기법을 쓴 라이브러리 추천

- [react-window](https://github.com/bvaughn/react-window)
- [react-virtualized](https://github.com/bvaughn/react-virtualized)

### Hook eslint 플러그인

- eslint-plugin-react-hooks

### next.js with styled-components

[Guide](https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js)

### styled-components Tooling

babel-plugin (for SSR, minification of styles, nicer debugging)
[자세히보기](https://styled-components.com/docs/tooling#babel-plugin)

```
yarn add --dev babel-plugin-styled-components
```

```
in .babelrc

{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true, // ssr 설정 옵션
        "displayName": true // 디버깅시 이름이 표시됨
        "fileName": false // displayName 강제하기
        "minify": true, // 주석과 공백을 제거함
        "transpileTemplateLiterals": false, // 템플릿 리터럴 트랜스 파일
        "pure": true, // 순수 주석 제거
        "namespace": "my-app", // 네임스페이스 지정 (클래스 이름이 고유하도록 보장함)
      }
    ]
  ]
}
```

Jest Integration

```
yarn add --dev jest-styled-components
```
