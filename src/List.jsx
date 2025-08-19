import styled, { css } from "styled-components";
import Item from "./Item";
import { useTransactions } from "./App";
import { respond } from "./styles/mixins";

const Container = styled.div`
  margin-top: var(--space-6);
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 2rem;

  ${respond.phone(css`
    grid-template-columns: 1fr;
  `)}

  .header {
    background-color: #000;
    color: #fff;

    ${respond.phone(css`
      display: none;
    `)}
  }
  .cell {
    padding: var(--space-6);

    ${respond.tabPort(css`
      padding: var(--space-3);
    `)}
    ${respond.phone(css`
      padding: var(--space-1);
    `)}
  }
  .table-body {
    display: contents;
    max-height: 400px;
    overflow: auto;
  }
`;

function List() {
  const { transactions } = useTransactions();
  return (
    <Container>
      {transactions.length === 0 && <p>No transactions</p>}
      {transactions.length > 0 && (
        <StyledTable>
          <span className="header cell">Description</span>
          <span className="header cell">Type</span>
          <span className="header cell">Amount</span>
          <span className="header cell">Category</span>
          <span className="header cell">Date</span>
          <span className="header cell">Action</span>
          <div className="table-body">
            {transactions.map((transaction) => (
              <Item key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </StyledTable>
      )}
    </Container>
  );
}

export default List;
