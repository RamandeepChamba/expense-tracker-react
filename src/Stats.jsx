import styled, { css } from "styled-components";
import { useTransactions } from "./App";
import { respond } from "./styles/mixins";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-6);

  ${respond.phone(css`
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding-bottom: 2rem;

    border-bottom: 1px solid var(--color-light-3);
  `)}
`;

function Stats() {
  const { transactions } = useTransactions();
  const totalIncome = transactions.reduce((acc, curr) => {
    return acc + (curr.amount > 0 ? curr.amount : 0);
  }, 0);
  const totalExpense = Math.abs(
    transactions.reduce((acc, curr) => {
      return acc + (curr.amount < 0 ? curr.amount : 0);
    }, 0)
  );
  const netIncome = transactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return (
    <Container>
      <div>
        <h2>Total Income</h2>
        <span>Rs. {totalIncome}</span>
      </div>
      <div>
        <h2>Total Expense</h2>
        <span>Rs. {totalExpense}</span>
      </div>
      <div>
        <h2>Net Income</h2>
        <span>Rs. {netIncome}</span>
      </div>
    </Container>
  );
}

export default Stats;
