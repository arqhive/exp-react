import React from 'react';

// ThemeContext에 사용할 객체 리터럴
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  },
};

// context 객체를 만들고 내보낸다
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { }, // 실제 토글이 만들어지는 컴포넌트의 메서드와 이름이 동일해야 함
});