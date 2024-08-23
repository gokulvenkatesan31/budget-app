import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "./utils/utils"
import { useState } from "react";

export default function BudgetCard({id,name,amount,max=null,onAddExpenseClick,onViewExpenseClick,hideButtons}) {
    const classNames = [];
    if(max!==null && amount>max){
        classNames.push("bg-danger","bg-opacity-10");
    }
    else{
        classNames.push("bg-light");
    }
    const getProgressBarVariant = (amount ,max)=> {
        const ratio = amount/max;
        return ratio>=0.75? "danger" : ratio>=0.5?"warning" : "primary";
    }
  return (
    <Card className={classNames.join(" ")} key={id}> 
        <Card.Body >
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div className="me-2">{name}</div>
                <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)} 
                    { max && (<span className="text-muted fs-6 ms-1">
                    / {currencyFormatter.format(max)}
                    </span>)}</div>
            </Card.Title>
            {max &&  <ProgressBar now={amount}
             animated
             min={0} max={max}
              variant={getProgressBarVariant(amount,max)}/>}

             {!hideButtons && <Stack direction="horizontal" gap={2} className="mt-4">
                <Button variant="outline-primary" className="ms-auto"
                    onClick={onAddExpenseClick}
                >Add Expenses</Button>
                <Button variant="outline-secondary" onClick={onViewExpenseClick} >View Expenses</Button>
             </Stack>}
        </Card.Body>
    </Card>
  )
}
