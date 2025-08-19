import styled, { css } from "styled-components";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { useMyState } from "./App";
import { v4 as uuidv4 } from "uuid";
import { respond } from "./styles/mixins";

const Container = styled.div`
  background-color: var(--color-light-3);
  padding: 5rem;
  border-radius: 2px;

  ${respond.phone(css`
    width: 90%;
    padding: 3rem;
  `)}

  .heading {
    text-align: center;
  }
  .field {
    display: flex;
    flex-direction: column;

    label {
      font-size: var(--font-h3);
      font-weight: bold;
      color: var(--color-gray);
      margin-bottom: 5px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-4);
    width: 400px;
    margin-top: 4rem;

    ${respond.phone(css`
      width: 100%;
    `)}
  }
  input,
  select {
    border: none;
    padding: var(--space-5);
    border-radius: 2px;
  }
  button {
    width: 100%;
  }
`;

const categoriesForIncome = ["Salary", "Savings"];
const categoriesForExpense = ["Gas", "Food", "Transportation"];

// If there is transactionToUpdate, we are updating
function Form({ onClose }) {
  const { state, dispatch } = useMyState();
  const { typeToAdd, transactionToUpdate } = state;
  const [date, setDate] = useState(transactionToUpdate?.date ?? "");
  const [description, setDescription] = useState(
    transactionToUpdate?.description ?? ""
  );
  const [amount, setAmount] = useState(
    transactionToUpdate ? Math.abs(transactionToUpdate.amount) : 0
  );
  const [category, setCategory] = useState(
    transactionToUpdate?.category ?? categoriesForIncome[0]
  );
  const type = transactionToUpdate?.type ?? typeToAdd;
  const isUpdating = Boolean(transactionToUpdate);
  console.log(transactionToUpdate);

  // Only when adding
  useEffect(
    function () {
      if (isUpdating) return;
      if (type === "income") {
        setCategory(categoriesForIncome[0]);
      }
      if (type === "expense") {
        setCategory(categoriesForExpense[0]);
      }
    },
    [type, isUpdating]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const transaction = {
      type,
      date,
      description,
      amount: type === "income" ? amount : amount * -1,
      category,
    };
    if (isUpdating) {
      transaction.id = transactionToUpdate.id;
      dispatch({ type: "updateTransaction", payload: transaction });
    } else {
      transaction.id = uuidv4();
      dispatch({ type: "addTransaction", payload: transaction });
    }
    console.log(transaction);
  }
  return (
    <Container>
      <h1 className="heading">
        {isUpdating ? "Update" : "Add"}{" "}
        {type === "income" ? "Income" : "Expense"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            min="1"
            required
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        {/* <div className="field">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div> */}
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "income" &&
              categoriesForIncome.map((cat, i) => (
                <option key={`cat-${i}`} value={cat}>
                  {cat}
                </option>
              ))}
            {type === "expense" &&
              categoriesForExpense.map((cat, i) => (
                <option key={`cat-${i}`} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
        <Button variation="success">{isUpdating ? "Update" : "Add"}</Button>
        <Button variation="light" type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Container>
  );
}

export default Form;
