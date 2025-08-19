import styled, { css } from "styled-components";

export const Button = styled.button`
  ${(props) =>
    props.variation === "regular" &&
    css`
      background-color: var(--color-brand);
      color: var(--color-light);

      &:hover {
        background-color: var(--color-brand-dark-1);
      }
    `}
  ${(props) =>
    props.variation === "dark" &&
    css`
      background-color: var(--color-dark);
      color: var(--color-light);

      &:hover {
        background-color: var(--color-gray);
      }
    `}
  ${(props) =>
    props.variation === "light" &&
    css`
      background-color: var(--color-light);
      color: var(--color-dark);

      &:hover {
        background-color: var(--color-dark);
        color: var(--color-light);
      }
    `}
  ${(props) =>
    props.variation === "success" &&
    css`
      background-color: var(--color-success);
      color: var(--color-light);

      &:hover {
        background-color: var(--color-success-dark);
      }
    `}
  ${(props) =>
    props.variation === "danger" &&
    css`
      background-color: var(--color-danger);
      color: var(--color-light);

      &:hover {
        background-color: var(--color-danger-dark);
      }
    `}
    
    ${(props) =>
    props.radius === "rounded" &&
    css`
      border-radius: 5px;
    `}

  display: inline-block;
  text-decoration: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s all;
  font-size: inherit;
  text-align: center;

  &:disabled {
    cursor: not-allowed;
  }
`;
