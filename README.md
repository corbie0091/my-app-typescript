## Yarn패키지 적용하기

- 성능 / 속도 측면에서 npm보다 유리하기떄문에 적용함
- yarn init 해서 관련 코드 입력
- yarn 해서 yarn.lock생성
- package lock json 파일 삭제( npm과 yarn 파일이 겹쳐 삭제하라는 문구가 떳기
  때문)

## Prettier, ESLint 설치하기

### Prettier ( formatter )

- Prettier는 코드 포맷터(Code Formatter)로 우리가 작성한 코드를 가독성 좋게
  만들어주는 확장 도구
- 이 도구를 사용하면 여러 개발자들의 코드 스타일을 통일하여 균일한 코드 품질을
  가질 수 있게 만들 수 있음 (코드 push, merge시에) 엄청난 변경을 불러일으킬 수
  있기에 그런 오류를 잡으려고 설치해야함

- [설치] yarn add --dev prettier npm install -D prettier

### Prettier설정

1. .prettierrc파일 생성
2. 안에 관련 설정입력 ( 구글에 검색 )

- Prettier 사이트에서 Configuration File참고

3. package.json > scripts > "format" : "prettier --check ./src", "format:fix":
   "prettier --write ./src"입력
4. 터미널에 yarn format입력 후 에러확인하고
5. 터미널에 yarn format:fix 입력
6. "" => ''으로 바뀌는 등의 prettier가 적용된 모습확인 가능

#### [참고]CRLF 와 LF차이의 이해

- CRLF는 둘다 쓰겠다는 의미 , 줄바꿈에대한 정의가 운영체제마다 조금씩 다른
  것들이 있음

### ESLint (정적 분석 도구)

ESLint는 ES(ECMAScript)와 Lint의 합성어로, 자바스크립트를 분석하여 오류나 버그를
찾는데 도움을 주는 정적 분석 도구

- [설치] yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier npm
  install -D eslint eslint-config-prettier eslint-plugin-prettier

- [주의] eslint-plugin-prettier는 프로젝트에 설치하지 않음

- eslint-config-prettier : eslint에서 prettier와 충돌할 수 있는 rule을 끔(우리는
  prettier를 쓸거기때문에 여기서의 formatter를 꺼버려서 충돌을 방지하는 것임)
- eslint-plugin-prettier : prettier를 eslint의 rules로 동작(느려서 비추한다는
  의견도 있긴함) -> 그래서 실제 프로젝트에 설치하진 않았음

### ESLint 설정

npx eslint --init > Enter키입력 > 방향키+Enter로 설정진행 > problems ,
javascript module , react, typescript, browser, Yes, yarn, > 설치완료. 이후
eslint.config.mjs ( 이전 eslitrc.js와 유사)

- [참고]rules에 필요한 룰이 있다면 적용시키면 된다.

#### 추가 작업 in eslint.config.mjs

- 리액트 버전을 감지할 수 있도록 셋팅 "settings": { react: { version: 'detect',
  }}
- 추가한 off설정은 jsx파일에서 import react from react를 항상 사용하도록 하는
  부분임 , 리액트 17버전이후에서는 import할 필요가 없는 부분을 설정 "rules": {
  'react/react-in-jsx-scope' : 'off', }
- 이후 script에 추가 -- "lint": "eslint ./src", -- "lint:fix": "eslint --fix
  ./src"

  이렇게 해서 yarn lint > yarn lint:fix로 수정해주면 된다.

  - [참고]fix를 했을때도 수정이 안되면 직접 찾아서 수정

## Emotion 적용하기

- 리액트에서 컴포넌트의 스타일을 적용하는 방식
- CSS in CSS
- CSS in JS

1. CSS in CSS

- 리액트 컴포넌트 별로 CSS파일을 갖는 형식으로 스타일을 관리
- CSS Module
- 별도의 자바스크립트 전환이 필요 없어 속도가 빠름

2. CSS in JS

- 자바스크립트 내에서 css를 작성하는 방식
- 대표적으로 styled-component, emotion등이 있음
- 현재 사용 중인 스타일만 DOM에 포함시킬 수 있음
- 별도 패키지를 설치하기 때문에 용량이 증가한다 ( 스크립트 전환이 필요하여
  속도도 다소 느려진다.)

### Emotion

- Emotion은 CSS-in-JS 라이브러리 중 하나

- vs styled-component ?? 큰 차이가 없다
- styled-component는 한국에서 많이 사용
- emotion은 global 하면서도 개발친화적이다는 평이 많음

- [설치] yarn add @emotion/react @emotion/styled
- [참고] @emotion/styled로 같이 설치하면 styled-component사용과 이질감이 없다

- [Q] App.css 를 삭제하고 관련 부분들을 App.tsx에 styled설정을 해보자
- [참고] 이후 yarn format 명령어로 정리 해주면 된다.

## Props

- Props는 properties의 줄임말로 컴포넌트에 어떤 값을 넘겨주기 위해 사용됨
- 이를 통해 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 수 있음
- 다만 자식 컴포넌트의 입장에서는 전달받은 값이기 떄문에 수정이 불가능하다는
  특징이 있음

- [TypeScript]
- ex)

```
interface Props {
  name: string;
  color: string
}

export conmst Hello = {{name, color}: Props => {
  return <div style={{color}}>Hello {name}</div>
}}
```

- 그리고 실제 컴포넌트를 가져다 사용할 땐, 아래와 같이 Props에 넘겨줄 값을
  보내주면 됨.

```
import Hello from './Hello'

function App() {
  return <Hello name={'MY APP TYPESCRIPT'} color={'red'}></Hello>
}
export default App
```

### Optional Props

만약 Optional하게 사용되는 props를 설정해야 한다면 ?를 사용 interface Props {
name: string; color?: string; }

### Default Props

만약 Optional하게 사용되는 props의 값을 참조했을 경우. 값이 없다면 기본값을
지정하여 사용할 수 있음

```
export const Hello = ({name, color = 'blue'}: Props) => {
  return <div style={{ color }}> Hello {name}</div>
}
```

## Props2

- Hello.tsx , Hello2.tsx참고

```
export const Hello = ({ name = 'flature', color = 'blue' }: Props) => {
  return <div style={{ color }}>Hello {name}</div>;
};
```

```
function Hello({ name, color }: Props) {
    return <div style={{ color }}>Hello {name}</div>;
  }
```

- 는 같은 구조이다 . -> 하지만 앞으로는 const 변수로 정의하는 컴포넌트에
  익숙해질 필요가 있다.

```(App.jsx)
function App() {
  return <Hello name={'MY APP TYPESCRIPT'} ></Hello>;
}
```

- color 속성을 지우고 컴파일하면 error가 발생함
- [참고]하지만 그전에 {}에 빨간줄이 그어지면서 안된다는 것을 미리 알 수 있음
- interface의 color에 Optional설정을 함으로써 null값이 넘어가게되고, 이는 color
  속성이 기본값으로 설정할 수 있게됨

### Emotion의 스타일 컨테이너 적용 in Hello2.tsx

```(Hello2.tsx에서 추가된 부분)
interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  color: ${(props) => props.color};
`;
```

- Hello.tsx 와 Hello2.tsx는 동일한 동직을 해서 같아보이지만 구분하는 이유가
  있다.
- [Why] 인터페이스들이 분리될 수 있음( 파일로)
- 지금은 쪼개서 쓸 수 있고, 스타일에도 props를 사용할 수 있구나 정도로만
  이해하면 됨
- 만약 글로벌하게 스타일을 관리하겠다해서 파일을 분리할 때 활용할 가치가 있음
