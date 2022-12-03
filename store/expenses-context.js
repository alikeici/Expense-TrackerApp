import { createContext, useReducer } from "react";


// definierar kroppen av min context data/objekt
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  setExpenses: (expenses) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { },
});

//returnerar och Updaterar de olika actions i ExpensesContextProvider
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":

      // skapar nytt objekt och en ny array för att uppdatera state på ett ofäränderligt sätt som inte påverkar orginal data i minnet.
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[updateExpenseIndex];

      const updatedItem = { ...updateExpense, ...action.payload.data };

      const updatedExpenses = [...state];

      updatedExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

//skickar med all state management logik i children prop som wrappas i provider komponeneten

function ExpensesContextProvider({ children }) {

  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses })
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;