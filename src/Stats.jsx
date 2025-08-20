import styled, { css } from "styled-components";
import { useMyState } from "./App";
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
  const { visibleIncomeTransactions, visibleExpenseTransactions } =
    useMyState();
  const totalVisibleIncome = visibleIncomeTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const totalVisibleExpense = Math.abs(
    visibleExpenseTransactions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0)
  );
  const netIncome = totalVisibleIncome - totalVisibleExpense;
  return (
    <Container>
      <div>
        <h2>Total Income</h2>
        <span>Rs. {totalVisibleIncome}</span>
      </div>
      <div>
        <h2>Total Expense</h2>
        <span>Rs. {totalVisibleExpense}</span>
      </div>
      <div>
        <h2>Net Income</h2>
        <span>Rs. {netIncome}</span>
      </div>
    </Container>
  );
}

export default Stats;
