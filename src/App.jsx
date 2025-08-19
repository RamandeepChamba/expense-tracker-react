import styled, { css } from "styled-components";
import Form from "./Form";
import List from "./List";
import Modal from "./Modal";
import Stats from "./Stats";
import GlobalStyles from "./styles/GlobalStyles";
import { createContext, useContext, useReducer, useState } from "react";
import { Button } from "./ui/Button";
import { respond } from "./styles/mixins";

const TransactionsContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "addTransaction":
      return [...state, action.payload];
    case "deleteTransaction":
      // eslint-disable-next-line no-case-declarations
      const filteredTransactions = state.filter(
        (transaction) => transaction.id !== action.payload
      );
      return filteredTransactions;
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
`;

function App() {
  const [transactions, dispatch] = useReducer(reducer, []);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <GlobalStyles />
      <TransactionsContext.Provider value={{ transactions, dispatch }}>
        <Container>
          <StyledApp>
            <Button
              variation="success"
              onClick={() => setShowForm(true)}
              radius="rounded"
            >
              Add
            </Button>
            {showForm && (
              <Modal>
                <Form onClose={() => setShowForm(false)} />
              </Modal>
            )}
            <Stats transactions={transactions} />
            <List />
          </StyledApp>
        </Container>
      </TransactionsContext.Provider>
    </>
  );
}

export function useTransactions() {
  const value = useContext(TransactionsContext);
  return value;
}

export default App;
