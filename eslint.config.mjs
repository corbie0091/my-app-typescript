import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 파일 대상으로 적용
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  // 브라우저 환경 설정
  { languageOptions: { globals: globals.browser } },

  // 기본 JavaScript 규칙
  pluginJs.configs.recommended,

  // TypeScript 규칙
  ...tseslint.configs.recommended,

  // React 규칙
  pluginReact.configs.flat.recommended,

  // 리액트 관련 설정 추가
  {
    settings: {
      react: {
        version: 'detect', // 리액트 버전을 자동으로 감지
      },
    },

    rules: {
      // React 17+에서는 JSX를 사용하기 위해 import React를 명시적으로 추가할 필요 없음
      'react/react-in-jsx-scope': 'off',
    },
  },
];
