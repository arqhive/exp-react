# Create React App

## 앱 생성

기본 생성

```
npx create-react-app [app-name]
```


템플릿 지정

```
npx create-react-app [app-name] --template [template-name]

// typescript template
npx create-react-app [app-name] --template typescript
```

패키지 매니저 선택 (기본 생성시 yarn으로 지정됨)
```
npx create-react-app [app-name] --use-npm
```

---

## 기본 Folder Structure

프로젝트를 빌드하려면 아래 2개의 파일이 정확히 같은 위치와 이름으로 있어야 함
- public/index.html (Page template)
- src/index.js (JavaScript entry)

웹팩은 `src` 폴더 내부 파일만 처리해 빠른 재빌드를 한다. 그러므로 src 내부에 JS 및 CSS 파일을 넣어야 한다.

Git이 설치되어 있으면 최상위 `.git` 이 자동으로 생성된다.

---

## 기본 scripts

개발 모드에서 앱을 실행한다. http://localhost:3000 에서 실행된다.
```
yarn start
```

대화식 시계 모드에서 테스트 러너를 시작한다.
```
yarn test
````

build 폴더에 프로덕션용 앱을 빌드 한다. 프로덕션 모드에서는 React를 올바르게 번들로 만들고 최상의 성능을 위해 빌드를 최적화 한다.
```
yarn build
```

빌드 도구 및 구성을 재설정하거나 수정하고 싶을때. 즉, 단일 빌드 종속성을 제거하고 프로젝트에 종속성으로 복사하고 싶을때

한번 `eject`하면 다시 되돌릴 수 없다.
```
yarn eject
```

## 지원 브라우저 및 기능

기본적으로는 모든 최신 브라우저를 지원한다. IE 9, 10, 11을 지원하려면 [react-app-polyfill](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md) 사용

다음 기능을 지원한다.
- 지수 연산자 (2 ** 3) (ES2016)
- async/await (ES2017)
- Object rest/spread (ES2018)
- Dynamic import (4단계 제안)
- 클래스 필드 및 static property (3단계 제안의 일부)
- JSX, Flow, TypeScript

<b>기본적으로 폴리필을 포함하지 않는다.</b> Array.from(), Symbol을 사용하는 경우 적절한 폴리필을 수동으로 포함해야 한다.

package.json 내 browerlist에서 지원 범위를 수정할 수 있다. (자세한 내용은 [browerslist 참고](https://github.com/browserslist/browserslist#queries))
```
  "browserslist": {
    "production": [
      ">0.2%", -> 이것은 광범위한 지원을 의미한다.
      "not dead", ->  24개월간 공식 지원 또는 업데이트가 없는 브라우는 제외한다.
      "not op_mini all" -> 오페라 미니는 전부 제외한다.
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
  ```

  > browserslist를 편집하면 변경 사항이 바로 적용되지 않는 것을 확인할 수 있는데, babel-loader가 package.json의 변경 사항을 감지하기 못하기 때문이다. 빠른 해결 방법은 node_modules/.cache 를 삭제하고 다시 시도하는 것이다.

---

## Editor 설정 (for VSCode)

### Syntact highlighting

- Babel Javascript (extension)

### Debug (기본적으로 JavaScript Debugger가 설치되어 있으며 좌측 메뉴 디버거 버튼으로 설정 파일 생성후 실행)

husky hook을 이용해 커밋때마다 자동으로 prettier를 적용하게 할수 있음

---

## 격리된 컴포넌트 개발

- [Storybook for React](https://storybook.js.org/)
- [React Styleguidist](https://react-styleguidist.js.org/)

---

## 번들 사이즈 분석하기

- [Source map explorer](https://github.com/danvk/source-map-explorer)

--

## HTTPS로 개발하기

```
HTTPS=true yarn start
```

## 스타일 및 에셋

- 기본적으로 [CSS Module](https://github.com/css-modules/css-modules)을 지원한다.
- Sass 지원하기 [Adding Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet)
- CSS 재설정을 위한 PostCSS Normarlize를 기본적으로 지원한다. 아무 CSS 파일에 `@import-normalize`를 추가한다. (index.css 권장)
- Autoprefixer를 통해 자동으로 Vendor prefix를 추가한다. CSS 그리드 레이아웃 접두사는 기본적으로 비활성화 되어있지만 수동으로 작성한 경우 제거되지 않는다. 접두사를 활성화 하려면 CSS 파일 맨 위에 `/* autoprefixer grid: autoplace */` 를 추가한다.
- 웹팩에 의하여 이미지나 SVG 에셋을 모듈처럼 불러와서 쓸수 있다.
- [.grphql 불러오기](https://create-react-app.dev/docs/loading-graphql-files)
- public 폴더 내에 다른 에셋(js, image...)를 추가할 수 있다. 웹팩에 의해 처리되지 않고 빌드 폴더에 그대로 볼사된다. `PUBLIC_URL` 이라는 환경 변수를 이용해 public 폴더의 에셋을 참조할 수 있다. (href="%PUBLIC_URL%/favicon.ico") JS 코드내에서는 `process.env.PUBLIC_URL`로 접근할 수 있다.
- 기본적으로 Dynamic import를 통한 코드 스플릿을 지원한다. React Router를 사용하는 경우에는 [참고](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)

## 절대경로를 이용해 파일 불러오기 (tsconfig.json 또는 jsconfig.json)

아래 코드 추가
```
{
  "compilerOptions": {
    "baseUrl:" "src"
  },
  "include": ["src"]
}
```
이렇게 하면 에디터 경로 자동완성이 src 부터 시작됨

컴파일과 같이하려면 babel 설정도 필요하다.

## 전역 변수
window 객체에 프로퍼티를 추가해 전역변수로 사용할 수 있다. 단 Linter가 변수 정의를 알 수 없어 에러로 표시한다.

## 환경 변수 (process.env ... 로 접근)

자세한건 [dotenv](https://github.com/motdotla/dotenv)

- .env : 기본
- .env.local : 로컬 재정의. 이 파일은 테스트를 제외한 모든 환경에 로드된다.
- .env.development, .env.test, .env.production : 환경벌 설정
- .env.developmentlocal, .env.test.local, .env.production.local : 환경벌 설정의 로컬 재정의

[고급 환경변수 설정](https://create-react-app.dev/docs/advanced-configuration)

스크립트별 우선 순위

- yarn start : .env.development.local, .env.local, .env.development, .env
- yarn build : .env.production.local, .env.local, .env.production, .env
- yarn test : .env.test.local, .env.test, .env (.env.local 포함되지 않음)

## 테스트

[TODO](https://create-react-app.dev/docs/running-tests)
