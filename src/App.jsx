import styled, { css } from "styled-components";
import Form from "./Form";
import List from "./List";
import Modal from "./Modal";
import Stats from "./Stats";
import GlobalStyles from "./styles/GlobalStyles";
import { createContext, useContext, useMemo, useReducer } from "react";
import { Button } from "./ui/Button";
import { respond } from "./styles/mixins";
import Select from "./ui/Select";
import { categoriesForExpense, categoriesForIncome } from "./categoriesOptions";

const TransactionsContext = createContext();

const initState = {
  transactions: [],
  showForm: false,
  typeToAdd: "",
  transactionToUpdate: null,
  // For animation on add and update
  justAddedUpdatedTransaction: null,
  // filters
  incomeFilters: { category: [] }, // {category: ['salary'], date: ...}
  expenseFilters: { category: [] },
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
    case "addIncomeFilter":
      return {
        ...state,
        incomeFilters: { ...state.incomeFilters, ...action.payload },
      };
    case "addExpenseFilter":
      return {
        ...state,
        expenseFilters: { ...state.expenseFilters, ...action.payload },
      };
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

    ${respond.phone(css`
      flex-direction: column;
      align-items: flex-start;
    `)}

    select {
      margin-left: auto;

      ${respond.phone(css`
        margin-left: 0;
      `)};

      option {
        padding: 5px;
      }
    }
  }
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const visibleIncomeTransactions = useMemo(() => {
    // Filter income transactions
    if (state.incomeFilters.category.length === 0) {
      // All income transactions
      return state.transactions.filter((transaction) => transaction.amount > 0);
    } else {
      return state.transactions.filter(
        (transaction) =>
          transaction.amount > 0 &&
          state.incomeFilters.category.includes(transaction.category)
      );
    }
  }, [state.transactions, state.incomeFilters]);
  const visibleExpenseTransactions = useMemo(() => {
    // Filter expense transactions
    if (state.expenseFilters.category.length === 0) {
      // All expense transactions
      return state.transactions.filter((transaction) => transaction.amount < 0);
    } else {
      return state.transactions.filter(
        (transaction) =>
          transaction.amount < 0 &&
          state.expenseFilters.category.includes(transaction.category)
      );
    }
  }, [state.transactions, state.expenseFilters]);

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
              {state.transactions.length > 0 && (
                <Select
                  name="category"
                  options={categoriesForIncome}
                  isMultiple={true}
                  onOptionSelect={(values) =>
                    dispatch({
                      type: "addIncomeFilter",
                      payload: { category: values },
                    })
                  }
                />
              )}
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
              {/* Category Filter */}
              {state.transactions.length > 0 && (
                <Select
                  name="category"
                  options={categoriesForExpense}
                  isMultiple={true}
                  onOptionSelect={(values) =>
                    dispatch({
                      type: "addExpenseFilter",
                      payload: { category: values },
                    })
                  }
                />
              )}
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
