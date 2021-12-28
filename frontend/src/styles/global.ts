import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Quicksand', sans-serif;
        background-color: #EFEEEE;
        max-width: 1100px;
        margin: 30px auto;
        padding: 0 32px;
    }
`;
