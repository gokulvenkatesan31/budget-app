import { Button, Modal, Stack } from "react-bootstrap";
import { useBudgets,UNCATEGORIZED_BUDGET_ID } from "./context/BudgetContext";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import { currencyFormatter } from "./utils/utils";

export default function ViewExpenseModal({budgetId,handleClose}) {

    const {getBudgetExpenses,deleteBudget,deleteExpense, budgets} =  useBudgets();
    const expenses = getBudgetExpenses(budgetId);
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name:"Uncategorized",id:UNCATEGORIZED_BUDGET_ID} : budgets.find(b=> b.id === budgetId);
  return (
    <Modal show={budgetId!=null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId!==UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={()=> {
                                console.log("Deleting budget:", budgetId);
                                deleteBudget(budgetId)
                                handleClose();
                            }} variant="outline-danger">Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Stack direction="vertical" gap="3"></Stack>
                    {expenses.map(expense=>(
                        <Stack direction="horizontal" gap="2" key={expense.id} >
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className=" fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button size="sm" variant="outline-danger" onClick={()=>{
                                deleteExpense(expense)
                            }}>+</Button>
                        </Stack>
                    )
                    )}
            </Modal.Body>
    </Modal>
  )
}
