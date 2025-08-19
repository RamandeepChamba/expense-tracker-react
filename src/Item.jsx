import { useTransactions } from "./App";
import { Button } from "./ui/Button";

function Item({
  transaction: { id, description, type, amount, category, date },
}) {
  const { dispatch } = useTransactions();
  function handleDelete() {
    dispatch({ type: "deleteTransaction", payload: id });
  }
  return (
    <>
      <span className="cell">{description}</span>
      <span className="cell">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <span className="cell">Rs. {Math.abs(amount)}</span>
      <span className="cell">{category}</span>
      <span className="cell">{date.toLocaleString()}</span>
      <Button variation="danger" radius="rounded" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}

export default Item;
