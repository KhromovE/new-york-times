import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    width: 100%;
  }

  body {
    font-size: 16px;
    font-family: "Gentium Basic", serif;
    background-color: var(--newspapper);
    color: var(--primary);
    font-family: 'Droid Serif', serif;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --primary: #2f2f2f;
    --black: #000000;
    --darkest-gray: #585858;
    --gray: #7a7a7a;
    --light-gray: #bfbfbf;
    --lighter-gray: #e2e2e2;
    --lightest-gray: #e7e7e7;
    --white: #ffffff;
    --newspapper: #f9f7f1;
  }
`
