import { css } from "styled-components";

export const breakpoints = {
  phone: "37.5em", // 600px
  tabPort: "56.25em", // 900px
  tabLand: "75em", // 1200px
  bigDesktop: "112.5em", // 1800px
};

export const respond = {
  phone: (styles) => css`
    @media (max-width: ${breakpoints.phone}) {
      ${styles}
    }
  `,
  tabPort: (styles) => css`
    @media (max-width: ${breakpoints.tabPort}) {
      ${styles}
    }
  `,
  tabLand: (styles) => css`
    @media (max-width: ${breakpoints.tabLand}) {
      ${styles}
    }
  `,
  bigDesktop: (styles) => css`
    @media (min-width: ${breakpoints.bigDesktop}) {
      ${styles}
    }
  `,
};
