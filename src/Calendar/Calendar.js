import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import CalendarWeek from './WeekView/CalendarWeek'
import { Button, ButtonGroup } from 'reactstrap'
import CalendarMonth from './MonthView/CalendarMonth'
import CalendarYear from './CalendarYear'
import CalendarDay from './DayView/CalendarDay'

export default function Calendar() {
    const [calendarView, setCalendarView] = useState('week')
    const [calendar, setCalendar] = useState()

    useEffect (() => {
        if (calendarView === 'week') {
            setCalendar(< CalendarWeek />)
        }
        if (calendarView === 'month') {
            setCalendar(< CalendarMonth/>)
        } 
        if (calendarView === 'day') {
            setCalendar(< CalendarDay/>)
        } 
        if (calendarView === 'year') {
            setCalendar(< CalendarYear/>)
        }
    }, [calendarView])
    return (
        <div className="Calendar">

            <div className="toggleCalendarView">
                    <ButtonGroup size='sm'>
                        <Button color="success" onClick={() => setCalendarView('day')} active={calendarView==='day'}>day</Button>
                        <Button color="warning" onClick={() => setCalendarView('week')} active={calendarView==='week'}>week</Button>
                        <Button color="info" onClick={() =>setCalendarView('month')} active={calendarView==='month'}>month</Button>
                        <Button color="dark" onClick={() => setCalendarView('year')} active={calendarView==='year'}>year</Button>
                    </ButtonGroup>
                </div>
            {calendar}

        </div>
    )
}