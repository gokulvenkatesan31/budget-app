import './App.css';
import { Container,Button,Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import AddBudgetModal from './AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import ViewExpenseModal from './ViewExpenseModal';
import { useState } from 'react';
import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from './UncategorizedBudgetCard';
import TotalBudgetCard from './TotalBudgetCard';

function App() {
  const {budgets} = useBudgets();
  const {getBudgetExpenses} = useBudgets();
  const [showAddBudgetModal,setShowAddBudgetModal] = useState(false)
  const [viewExpensesModalBudgetId,setviewExpensesModalBudgetId] = useState()
  const [AddExpanseBudgetId,setAddExpanseBudgetId] = useState()

  const [showAddExpenseModal,setShowAddExpenseModal] = useState(false)
  
  const openAddExpenseModal =(budgetId)=>{
    setShowAddExpenseModal(true);
    setAddExpanseBudgetId(budgetId);
  }

  return ( 
    <>
    <Container className='my-3'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto' >Budgets</h1>
        <Button variant='primary' onClick={()=>{setShowAddBudgetModal(true)}}>Add Budget</Button>
        <Button variant='outline-primary' onClick={()=>openAddExpenseModal()} >Add Expense</Button>
      </Stack>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:'1rem',alignItems:"flex-start"
      }}>

        {budgets.map(budget=>{
          
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
  
          return <BudgetCard  id={budget.id} name={budget.name} amount={amount} max={budget.max}
                              onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
                              onViewExpenseClick={()=>setviewExpensesModalBudgetId(budget.id)}
                            
          />
        })
        
      }
      <UncategorizedBudgetCard   onAddExpenseClick={openAddExpenseModal}
                                  onViewExpenseClick={()=>setviewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
      <TotalBudgetCard />

      </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={()=>{
      setShowAddBudgetModal(false)}} />
    <AddExpenseModal show={showAddExpenseModal} 
      defaultBudgetId={AddExpanseBudgetId}
      handleClose={()=>{
      setShowAddExpenseModal(false)}}  />
    
    <ViewExpenseModal  
    budgetId={viewExpensesModalBudgetId}
    handleClose={()=>{ setviewExpensesModalBudgetId(null)
    }} />
  </>
    
  )
}

export default App
