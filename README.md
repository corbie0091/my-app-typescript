## Yarn패키지 적용하기

- 성능 / 속도 측면에서 npm보다 유리하기떄문에 적용함
- yarn init 해서 관련 코드 입력
- yarn 해서 yarn.lock생성
- package lock json 파일 삭제( npm과 yarn 파일이 겹쳐 삭제하라는 문구가 떳기 때문)

## Prettier, ESLint 설치하기

### Prettier ( formatter )

- Prettier는 코드 포맷터(Code Formatter)로 우리가 작성한 코드를 가독성 좋게 만들어주는 확장 도구
- 이 도구를 사용하면 여러 개발자들의 코드 스타일을 통일하여 균일한 코드 품질을 가질 수 있게 만들 수 있음
  (코드 push, merge시에) 엄청난 변경을 불러일으킬 수 있기에 그런 오류를 잡으려고 설치해야함

[설치]
yarn add --dev prettier
npm install -D prettier

### ESLint (정적 분석 도구)

ESLint는 ES(ECMAScript)와 Lint의 합성어로, 자바스크립트를 분석하여 오류나 버그를 찾는데 도움을 주는 정적 분석 도구

[설치]
yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier
npm install -D eslint eslint-config-prettier eslint-plugin-prettier

- eslint-config-prettier : eslint에서 prettier와 충돌할 수 있는 rule을 끔(우리는 prettier를 쓸거기때문에 여기서의 formatter를 꺼버려서 충돌을 방지하는 것임)
- eslint-plugin-prettier : prettier를 eslint의 rules로 동작(느려서 비추한다는 의견도 있긴함)
