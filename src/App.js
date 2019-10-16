import React, { useState, useEffect } from 'react'
import ToDo from './ToDo'
import { Button } from 'reactstrap'
import Calendar from "./Calendar/Calendar"

export default function App() {
    const [calendarView, setCalendarView] = useState(false)
    const [toDoView, setToDoView] = useState(false)
    const [view, setView] = useState()

    useEffect(() => {
        if (toDoView) {
            setView(< ToDo />)
        } else if (calendarView) {
            setView(< Calendar/>)
        }
    }, [toDoView, calendarView])
    
    return (
        <div className="App">

            <div className="fixMenu">
                <div className="tabs">
                  <Button onClick={() => {setCalendarView(true); setToDoView(false)}} color="danger">calendar</Button>
                  <Button onClick={() => {setToDoView(true); setCalendarView(false)}} color="info">todo</Button>
                </div>
            </div>

            <div className="container">
                {view}
            </div>

        </div>
    )
}