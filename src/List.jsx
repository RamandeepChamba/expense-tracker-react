import styled, { css } from "styled-components";
import Item from "./Item";
import { respond } from "./styles/mixins";

const Container = styled.div`
  margin-top: var(--space-6);
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 2rem;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  align-content: start;
  align-items: center;
  position: relative;

  ${respond.phone(css`
    grid-template-columns: 1fr;
  `)}

  .table-header {
    position: sticky;
    left: 0;
    top: 0;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    ${respond.phone(css`
      display: none;
    `)}
  }
  .header {
    background-color: #000;
    color: #fff;
  }
  .cell {
    padding: var(--space-6);
    word-break: break-all;

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

function List({ transactions }) {
  return (
    <Container>
      {transactions.length === 0 && <p>No transactions</p>}
      {transactions.length > 0 && (
        <StyledTable>
          <div className="table-header">
            <span className="header cell">Description</span>
            <span className="header cell">Type</span>
            <span className="header cell">Amount</span>
            <span className="header cell">Category</span>
            <span className="header cell">Date</span>
            <span className="header cell">Action</span>
          </div>
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
