import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        max-width: 1100px;
        margin: 30px auto;
        padding: 0 32px;
    }

    .divider-solid {
        border-top: 1px solid #F2F2F2;
        border-radius: 1px;
    }
`;
