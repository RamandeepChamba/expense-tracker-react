import styled, { css } from "styled-components";
import { useMyState } from "./App";
import { Button } from "./ui/Button";
import { useEffect, useRef } from "react";
import { respond } from "./styles/mixins";

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  overflow: hidden;
  transition: 0.4s all;

  ${respond.phone(css`
    grid-template-columns: 1fr;
  `)}

  &.deleting {
    animation: slideOut 0.4s ease-in-out 0s forwards;
  }

  &.added {
    animation: slideIn 0.4s ease-in-out 0s forwards;
  }
  &.updated {
    animation: blink 1s ease-in-out infinite;
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes blink {
    0% {
      background-color: #fff;
    }
    50% {
      background-color: var(--color-success);
    }
    100% {
      background-color: #fff;
    }
  }
`;

function Item({ transaction }) {
  const { id, description, type, amount, category, date } = transaction;
  const { dispatch, state } = useMyState();
  const containerElRef = useRef();

  useEffect(
    function () {
      if (!state.justAddedUpdatedTransaction) return;
      if (state.justAddedUpdatedTransaction.id === id) {
        containerElRef.current.classList.add(
          state.justAddedUpdatedTransaction.status
        );
        setTimeout(() => {
          containerElRef.current.classList.remove(
            state.justAddedUpdatedTransaction.status
          );
          dispatch({ type: "finishedAddingUpdatingAnimation" });
        }, 3000);
      }
    },
    [state, dispatch, id]
  );

  function handleDelete() {
    // Animate
    containerElRef.current.classList.add("deleting");
    // Delete after animation
    setTimeout(function () {
      dispatch({ type: "deleteTransaction", payload: id });
    }, 400);
  }
  function handleUpdate() {
    dispatch({ type: "openUpdateTransactionForm", payload: transaction });
  }
  return (
    <Container ref={containerElRef}>
      <span className="cell">{description}</span>
      <span className="cell">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <span className="cell">Rs. {Math.abs(amount)}</span>
      <span className="cell">{category}</span>
      <span className="cell">{date.toLocaleString()}</span>
      <div>
        <Button variation="dark" radius="rounded" onClick={handleUpdate}>
          Update
        </Button>
        <Button variation="danger" radius="rounded" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Container>
  );
}

export default Item;
