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

[설치] yarn add --dev prettier npm install -D prettier

### Prettier설정

1. .prettierrc파일 생성
2. 안에 관련 설정입력 ( 구글에 검색 )

- Prettier 사이트에서 Configuration File참고

3. package.json > scripts > "format" : "prettier --check ./src", "format:fix":
   "prettier --write ./src"입력
4. 터미널에 yarn format입력 후 에러확인하고
5. 터미널에 yarn format:fix 입력
6. "" => ''으로 바뀌는 등의 prettier가 적용된 모습확인 가능

[참고]CRLF 와 LF차이의 이해

- CRLF는 둘다 쓰겠다는 의미 , 줄바꿈에대한 정의가 운영체제마다 조금씩 다른
  것들이 있음

### ESLint (정적 분석 도구)

ESLint는 ES(ECMAScript)와 Lint의 합성어로, 자바스크립트를 분석하여 오류나 버그를
찾는데 도움을 주는 정적 분석 도구

[설치] yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier npm
install -D eslint eslint-config-prettier eslint-plugin-prettier [주의]
eslint-plugin-prettier는 프로젝트에 설치하지 않음

- eslint-config-prettier : eslint에서 prettier와 충돌할 수 있는 rule을 끔(우리는
  prettier를 쓸거기때문에 여기서의 formatter를 꺼버려서 충돌을 방지하는 것임)
- eslint-plugin-prettier : prettier를 eslint의 rules로 동작(느려서 비추한다는
  의견도 있긴함) -> 그래서 실제 프로젝트에 설치하진 않았음

### ESLint 설정

npx eslint --init > Enter키입력 > 방향키+Enter로 설정진행 > problems ,
javascript module , react, typescript, browser, Yes, yarn, > 설치완료. 이후
eslint.config.mjs ( 이전 eslitrc.js와 유사) [참고]rules에 필요한 룰이 있다면
적용시키면 된다.

#### 추가 작업 in eslint.config.mjs

- 리액트 버전을 감지할 수 있도록 셋팅 "settings": { react: { version: 'detect',
  }}
- 추가한 off설정은 jsx파일에서 import react from react를 항상 사용하도록 하는
  부분임 , 리액트 17버전이후에서는 import할 필요가 없는 부분을 설정 "rules": {
  'react/react-in-jsx-scope' : 'off', }
- 이후 script에 추가 -- "lint": "eslint ./src", -- "lint:fix": "eslint --fix
  ./src"

  이렇게 해서 yarn lint > yarn lint:fix로 수정해주면 된다. [참고]fix를 했을때도
  수정이 안되면 직접 찾아서 수정
