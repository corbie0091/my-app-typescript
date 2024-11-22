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

## Props 실전코드

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

## State

- State는 리액트에서 이벤트에 의해 변경되는 동적인 값을 의미
- 한 컴포넌트 안에서 유동적인 데이터를 다룰 때 사용되며 컴포넌트 안에서 데이터를
  변경할 수 있음
- Props는 부모 컴포넌트가 설정하는 값으로 일기 전용으로만 사용했지만,
- State는 하위 컴포넌트에서도 데이터를 변경할 수 있는 특징이 있음
- State를 사용하기 위해서는 useState라는 Hook을 사용

### State사용법

- useState의 코드는 아래와 같은 형식으로 만들어짐

```
const [state, setState] = useState(initialState);
const [message, setMessage] = useState('');
```

- 여기서 'setState'는 setter함수이므로 다른 곳에서 호출하여 state값을 변경할 때
  사용

-[예제]

```
const onChange = ( e: React.ChangeEvent<HTMLInputElement>): void => {
  setState(e.target.value);
}
```

- e는 이벤트라는 객체를 받아서 setState를 호출해서 입력하는 값들을 받아
  state값을 e.target.value값으로 변경해라는 뜻으로 진행 됨

## State 실전코드

- StateComponent1,2 .tsx 참고
- useState어떻게 동작하는지 참고
- 물론 새로고침하면 없어짐

### 응용

- PropsAndState.tsx참고
- 이는 컴포넌트인 Button폴더와 Label폴더의 index.tsx를 import받아서 설정했다.

- setState가 설정되어 있는 함수까지도 props로 넘겨서 사용할 수 있다는 점이
  포인트임.
- [앞으로..] 컴포넌트를 잘게잘게 쪼개는 연습이 필요함
- 버튼도 2개가 필요한데 하나의 컴포넌트로 재사용을 하고 있다는 점이 포인트.
- 데이터를 조회하는 페이지도 -조회하는 영역, - 기간설정 - 검색 -초기화 -표
  이런것들을 찍어내야한다면 컴포넌트들을 재사용할 수 있는 구조들을
  만들어야하므로
- 이런식으로 structure를 나눠보는 연습이 필요함

## Context API

### 기존 Props의 문제점(Props drilling)

계층적으로 내려가는 컴포넌트의 구조상 해당 prop이 필요없음에도 자식 컴포넌트에게
전해주기 위해 가지고있는 경우가 발생

- Component1 > Component2 > Component3
- 1에서 데이터가 생성이되고 3에서 사용을한다면 2에서(중간 컴포넌트)는 drilling이
  발생하게 됨
- 또 name이라는 props를 age로 바꾸게 되는 경우에 모든 컴포넌트의 코드를
  수정해야하므로 불편함

### 해답: Context

리액트에서 Context는 컴포넌트에게 Props를 사용하지 않고 필요한 데이터를 넘겨줄
수 있게하는 기능

- 대표적인 사용 예시 테마 설정(ex. 다크 모드), 언어 설정 등 ( 어떤 페이지에도
  설정이 공통적으로 설정됨 )
- Context Provider : Component1 > Context API (값을 넣어주는 컴포넌트)
- Context Consumer : Component3 < Context API (값을 소비하는 컴포넌트)

### Context 사용법

1. Context를 사용하기 위해서는 아래와 같은 Context를 생성해야 함

```
const TodoContext = createContext<TodoListContextValueType> | undefined>(
  undefined
);
```

- createContext를 사용해서 생성해야함
- ~Type으로 객체를 정의해주고 정의 되어있는 structure, 값들을 context에
  담을거야라는 것임

2. Context에서 제공하는 Provider를 사용하는 컴포넌트 생성

```
export const TodoProvider = (props: Props) => {
  // ...(중간 생략)

  return (
    <TodoContext.Provider value={value}>{props.children}></TodoContext.Provider>
  )
}
```

- 위에서 create한 TodoContext로 Provider로 컴포넌트를 생성하게 됨
- 컴포넌트만드는 방식과 동일
- 안에 뭐가 들어갈지 모르기떄문에 props.children 이런식으로 구성하게 됨
- children안에 객체를 넣어도 됨 - 실전 코드 참고

3. 해당 Context를 사용하는 컴포넌트들의 상단에 Provider 컴포넌트를 씌워야함

```
export const ContextExample = () => {
  return (
    <CountProvider>
      <CountLabel />
      <PlusButton>
    </CountProvider>
  )
}
```

- Context가 적용되어있는 Provider컴포넌트를 씌워줘야함

4. 실제 Context의 값을 사용하는 곳에서 useContext를 활용하여 가져다 사용함

```
export const CountLabel = () => {
  const {count} = useContext(CountContext);
  return<div>{count}</div>
}
```

- Provider에서 정의되어있는 값이나 함수들을 사용할 수 있게 됨 ( 처음 정의했던
  type쪽에서 정의한 것들을 사용할 수 있음 )
- 구조 분해해서 필요한 것만 땡겨올 수도 있고
- value전체를 끌어와 탐색해서 쓸 수도 있음

### Context주의사항

Context API를 사용할떄 값이 변경될 때마다 하위 컴포넌트들이 다시 랜더링되므로
성능에 영향을 줄 수 밖에 없음

- 아무래도 부모컴포넌트다 보니까 하위 컴포넌트들이 영향을 받을 수 밖에 없음
- 규모가 크지 않다면 크게 영향을 안 줄 수 있긴함
- [물론_해결방안은_있음]
- dispatch와 state를 구분해서 context를 2개로 쪼개는 방식
- 랜더링을 최소화 하기위해서 제한하는 방식있음

## Context API 실전 코드

### NonContext.tsx > GrandParent > Parent > Child > GrandChild

- props가 다 건너와야하는 불편함을 보여줌
- 하위 컴포넌트에 넘겨주기위해서 이렇게 불편하게 작업되어 있다.
- 만약 GrandChild에서의 interface에 있는 value부분을 age로 변경했을시에 각각의
  컴포넌트의 value부분을 다 바꿔주어야하는 상황이 발생하게 됨
- 타입스크립트는 다 체크해야하므로 간단한 props에서의 값이나 타입을 변경하므로
  인해 모든 파일의 변경이 발생될 수 있음
- 동료들과의 협업에서도 불편한 상황이 발생함
- 이런 케이스가 props를 사용하면 안되는 케이스임
- 물론 실무에서는 이정도면 ,, 할만함

### ContextExample , Context2

- Context가 어떻게 되는지 관계파악 (시간 오래걸릴듯..)
- [Q] 남은 버튼 구현(삭제버튼, boolean값 변경버튼)

## 레이아웃(Layout)

일반적인 페이지는 
Header, Menu(Option), SideBar(Option), Content, Footer로 구성 ( 유튜브 홈페이지 )

- 보통 Content만 바뀌는 경우가 많음 => 이럴때 레이아웃을 만들게 됨

### Layout구성하기
- Header 컴포넌트 생성
```
export const Header = () => {
  return (
    <Container>
      <Logo src='https://via.placeholder.com/150' alt='Logo' />
      <Nav>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Services</NavLink>
        <NavLink href="#">Contact</NavLink>
      </Nav>
    </Container>
  )
}

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Copy 2024 MY APP TYPESCRIPT. All rights reserved.</FooterText>
      <div>
        <SocialMediaLink href="#">Facebook</SocialMediaLink>
        <SocialMediaLink href="#">X</SocialMediaLink>
        <SocialMediaLink href="#">Instagram</SocialMediaLink>
      </div>
    </FooterContainer>
  )
}

export const Sidebar = () => {
  return (
    <Container>
      <Menu>
        <MenuItem>
          <MenuLink href="#">Home</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">About</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">Services</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">Contact</MenuLink>
        </MenuItem>
      </Menu>
      <Info>
        <InfoTitle>Follow Us</InfoTitle>
        <InfoText>Stay connected with us</InfoText>
      </Info>
    </Container>
  )
}

export const Example1 = () => {
  return (
    <Container>
      <Title>Example 1</Title>
      <Content>
        <Card>
          <Image
            src="https://via.placeholder.com/250'
            alt="Placeholder Image"
          />
          <Text>Lolen ipsum dolor sit sart, wfsocneerrcqw qwwr elit.</Text>
        </Card>
        <Card>
          <Image
            src="https://via.placeholder.com/250'
            alt="Placeholder Image"
          />
          <Text>Lolem ipsum dolor sit sart, wfsocneerrcqw qwwr elit.</Text>
        </Card>
      </Content>
    </Container>
  )
}
```

### Layout구성하기
Layout 컴포넌트를 생성하여 앞서 생성한 컴포넌트를 조합
- Container로 감싸면서 글로벌 규칙을 정해줄 수 있음 ( 이 컨테이너 안에서 )
- props.children 으로 이 안에 어떠한 컴포넌트든 들어갈 수 있음을 명시
- 전체적인 Layout을 정의함 위에는 헤더 옆에는  sidebar 밑에는 footer 가운데엔 content
```
export const Layout = (props: Props) => {
  return (
    <Container>
      <Header />
      <Content>
        <Sidebar />
        <Main>
          {props.children}
        </Main>
      </Content>
    </Container>
  )
}
```

- Content 사용부분
- App.tsx파일안에서 
- props.children안쪽으로 Example 1 컴포넌트가 들어가면서 우리가 말하고자하는 content 영역이 만들어짐
```
function App() {
  return (
    <Layout>
      <Example1 />
    </Layout>
  )
}
```

## Layout 실전 코드 
- Header Footer Sidebar를 emotion스타일을 적용시킨 것을 사이트에서 확인
- pages에서 변화되는 Component를 정의해놓음

### Emotion 스타일링 라이브러리
- styled 객체로 다양한 HTML태그를 커스텀 스타일 컴포넌트로 변환할 수 있다.
- styled는 HTML뿐만 아니라 사용자 정의 React컴포넌트와도 함께 사용할 수 있다.

1. 문서 구조 관련 태그
- header
- footer
- section
- article
- aside
- main
- nav

2. 텍스트 및 콘텐츠 태그
- h1, h2, ..., h6
- p
- blockquote
- span
- strong
- em
- mark

3. 폼 태그
- input
- textarea
- button
- select
- label
- fieldset
- legend

4. 리스트 태그
- ul
- ol
- li
- dl
- dt
- dd

5. 테이블 태그
- table
- thead
- tbody
- tr
- td
- th

6. 멀티미디어 태그
- audio
- video
- canvas
- picture
- source

7. 인터랙티브 및 SVG 관련 태그
- svg
- path
- circle
- rect
- g

8. 사용자 정의 React 컴포넌트에 styled 사용 
- 사용자 정의 컴포넌트에도 styled를 사용할 수 있다.
```
import styled from '@emotion/styled';

const CustomComponent = ({ className }) => (
  <div className={className}>Hello Emotion</div>
);

const StyledCustom = styled(CustomComponent)`
  color: red;
  font-size: 20px;
`;

export default StyledCustom;
```
### 스타일 관련 사이트
1. https://emotion.sh/docs/styled
2. https://devdocs.io/emotion/
3. https://css-tricks.com/emotion-a-css-in-js-library/
4. https://developer.mozilla.org/en-US/docs/Web/HTML/Element

[참고] pages > Example1 반응형으로 사이트가 작은화면-큰화면에서 바뀌는 원인코드
```
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`;
```
- auto-fit은 그리드 컨테이너의 가로 공간에 맞게 가능한 한 많은 열을 자동으로 생성
- 화면 크기에 따라 카드(Card)의 열 개수를 동적으로 조정
- minmax(250px, 1fr) : 각 열의 최소 너비는 "250px"이고, 최대 너비는 "1fr"이다
- "1fr"은 남은 가로 공간을 균등하게 나눈다.
- 화면이 작아지면 열의 너비가 "250px" 이하로 줄어들지 않고, 더 작아질 경우 다음 행으로 넘치게 된다.
