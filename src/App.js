import React, { useState } from "react";
import "./App.css"
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import AddBudgetModel from "./Components/AddBudgetModel";
import AddExpenseModel from "./Components/AddExpenseModel";
import ViewExpenseModel from "./Components/ViewExpenseModel";
import { useExpenseTracker } from "./Contexts/ExpenseTrackerContext";
import TotalExpense from "./Components/TotalExpense";
import { Toaster } from "react-hot-toast";





function App() {
  
  const [showAddBudgetModel, setShowAddBudgetModel] = useState(false)
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false)
  const [viewExpenseModelForABudgetId,setViewExpenseModelForABudgetId] = useState()
  const [addExpenseForABudgetId,setAddExpenseForABudgetId] = useState()
  const {budgets,allExpensesForABudget} = useExpenseTracker();

  const openAddExpenseModal=(budgetId)=>{
    setShowAddExpenseModel(true);
    setAddExpenseForABudgetId(budgetId);
  }
 
 

  return (
    <div className="App">
      {/* Toaster notifications */}
      <Toaster
        position="bottom-right"
        reverseOrder={false}/>   
        
      <Navbar/>
      
          {/*  Expenses heading  and Add Budget & add Expense Buttons */}
      <div className="flex flex-row justify-around items-center xl:mx-[16.5rem] 2xl:mx-[35rem]  md:mx-[8rem]   ">
            <h1 className=" text-[1.2rem] md:text-[2rem] font-bold">Your Expenses</h1>
       <div className="flex flex-row justify-around items-center space-x-4  ">
        <button className="bg-[#bdc3c7] text-gray-900 md:font-semibold font-bold text-[0.7rem] md:text-[1rem] rounded px-[0.5rem] py-[0.3rem]" onClick={()=>setShowAddBudgetModel(true)}> Add Budget</button>
       
        </div>
      </div>

       {/* Mapping Card with map function */}
      {budgets.map(budget=>{
          const expenseForABudget = allExpensesForABudget(budget.id).reduce((total,expense)=>total+expense.amount,0)
          return (<Cards key={budget.id} title={budget.budgetName?.budgetName} amount={expenseForABudget} maxAmount={budget.budgetName?.max} onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
          onViewExpenseClick={()=>setViewExpenseModelForABudgetId(budget.id)} />)
        })}


       {/* Card to show total expenses */}
       <TotalExpense/> 

       {/* Add budget Model */}
      <AddBudgetModel show={showAddBudgetModel} onClose={()=>setShowAddBudgetModel(false)}/>
       {/* Add Expense Model */}
      <AddExpenseModel show={showAddExpenseModel} defaultBudgetId={addExpenseForABudgetId} 
      onClose={()=>setShowAddExpenseModel(false)}
      />
      {/* View Expenses for a perticular budget or budgetId */}
      <ViewExpenseModel budgetId={viewExpenseModelForABudgetId} onClose={setViewExpenseModelForABudgetId} />
    </div>
  );
}

export default App;
