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