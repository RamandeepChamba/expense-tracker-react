import { createGlobalStyle } from "styled-components";
import { breakpoints } from "./mixins";

const GlobalStyles = createGlobalStyle`

:root {
    /* COLORS */
    --color-gray: #6b7280;
    --color-dark: #111827;
    --color-light: #f9fafb;
    --color-light-2: #f3f4f6;
    --color-light-3: #e5e7eb;
    --color-success: #16a34a;
    --color-success-dark: #15803d;
    --color-danger: #dc2626;
      --color-danger-dark: #b91c1c;

    /* FONT SIZES */
    --font-h1: 2.986rem;
    --font-h2: 2.488rem;
    --font-h3: 2.074rem;
    --font-h4: 1.728rem;
    --font-h5: 1.44rem;
    --font-h6: 1.2rem;
    --font-p: 1rem;
    --font-sm: 0.833rem;
    --font-xs: 0.694rem;

    /* SPACING */
    --space-0: 0rem;
    --space-1: 0.25rem;  
  --space-2: 0.5rem;   
  --space-3: 0.75rem;  
  --space-4: 1rem;    
  --space-5: 1.5rem;   
  --space-6: 2rem;
  --space-7: 2.5rem;  
  --space-8: 3rem;    


    font-size: 62.5%; // 10px (assuming default font size to be 16px)

    @media (max-width: ${breakpoints.phone}) {
      font-size: 50%; // 8px
    }
 }
 body {
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
 }
 *,
 *::before,
 *::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
 }
`;
export default GlobalStyles;
