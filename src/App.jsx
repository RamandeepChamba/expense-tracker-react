import styled, { css } from "styled-components";
import Form from "./Form";
import List from "./List";
import Modal from "./Modal";
import Stats from "./Stats";
import GlobalStyles from "./styles/GlobalStyles";
import { createContext, useContext, useReducer } from "react";
import { Button } from "./ui/Button";
import { respond } from "./styles/mixins";

const TransactionsContext = createContext();

const initState = {
  transactions: [],
  showForm: false,
  typeToAdd: "",
  transactionToUpdate: null,
  // For animation on add and update
  justAddedUpdatedTransaction: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAddTransactionForm":
      return {
        ...state,
        showForm: true,
        typeToAdd: action.payload,
      };
    case "openUpdateTransactionForm":
      return {
        ...state,
        showForm: true,
        transactionToUpdate: action.payload,
      };
    case "cancelForm":
      return {
        ...state,
        showForm: false,
        typeToAdd: "",
        transactionToUpdate: null,
      };
    case "addTransaction":
      return {
        ...state,
        showForm: false,
        typeToAdd: "",
        transactions: [...state.transactions, action.payload],
        justAddedUpdatedTransaction: {
          id: action.payload.id,
          status: "added",
        },
      };
    case "updateTransaction": {
      const updatedTransaction = action.payload;
      const filteredTransactions = state.transactions.map((transaction) => {
        if (transaction.id === updatedTransaction.id) {
          return updatedTransaction;
        }
        return transaction;
      });
      return {
        ...state,
        transactions: filteredTransactions,
        showForm: false,
        transactionToUpdate: null,
        justAddedUpdatedTransaction: {
          id: updatedTransaction.id,
          status: "updated",
        },
      };
    }
    case "finishedAddingUpdatingAnimation":
      return { ...state, justAddedUpdatedTransaction: null };
    case "deleteTransaction": {
      // eslint-disable-next-line no-case-declarations
      const filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      return { ...state, transactions: filteredTransactions };
    }
    default:
      return state;
  }
}

const Container = styled.div`
  background-image: linear-gradient(to right, #8e2de2, #4a00e0);
  min-height: 100vh;
  padding-top: 20rem;
  ${respond.tabPort(css`
    padding-top: 0;
  `)}
`;
const StyledApp = styled.div`
  background-color: var(--color-light);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 5px;
  overflow: auto;

  ${respond.tabPort(css`
    max-width: 100%;
  `)}

  .type-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 5rem;
  }
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const visibleIncomeTransactions = (function () {
    // Filter income transactions
    return state.transactions.filter((transaction) => transaction.amount > 0);
  })();
  const visibleExpenseTransactions = (function () {
    // Filter expense transactions
    return state.transactions.filter((transaction) => transaction.amount < 0);
  })();

  return (
    <>
      <GlobalStyles />
      <TransactionsContext.Provider
        value={{
          state,
          dispatch,
          visibleIncomeTransactions,
          visibleExpenseTransactions,
        }}
      >
        <Container>
          <StyledApp>
            <Stats />
            <div className="type-header">
              <h3>Income</h3>
              <Button
                variation="success"
                onClick={() =>
                  dispatch({
                    type: "openAddTransactionForm",
                    payload: "income",
                  })
                }
                radius="rounded"
              >
                Add Income
              </Button>
            </div>
            <List transactions={visibleIncomeTransactions} />
            <div className="type-header">
              <h3>Expenses</h3>
              <Button
                variation="success"
                onClick={() =>
                  dispatch({
                    type: "openAddTransactionForm",
                    payload: "expense",
                  })
                }
                radius="rounded"
              >
                Add Expense
              </Button>
            </div>
            <List transactions={visibleExpenseTransactions} />
          </StyledApp>
          {state.showForm && (
            <Modal>
              <Form onClose={() => dispatch({ type: "cancelForm" })} />
            </Modal>
          )}
        </Container>
      </TransactionsContext.Provider>
    </>
  );
}

export function useMyState() {
  const value = useContext(TransactionsContext);
  return value;
}

export default App;
