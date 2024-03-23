import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Color } from './variables';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${Color.MONO_A};
  }

  a {
    text-decoration: none;
  }

  .svg-icon {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentcolor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
  }
`;
