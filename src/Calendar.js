import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import CalendarWeek from './CalendarWeek'
import { Button, ButtonGroup } from 'reactstrap'
import CalendarMonth from './CalendarMonth'
import CalendarYear from './CalendarYear'

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
        if (calendarView === 'year') {
            setCalendar(< CalendarYear/>)
        }
    }, [calendarView])
    return (
        <div className="Calendar">

            <div className="toggleCalendarView">
                    <ButtonGroup size='sm'>
                        <Button color="warning" onClick={() => setCalendarView('week')} active={calendarView==='week'}>week</Button>
                        <Button color="info" onClick={() =>setCalendarView('month')} active={calendarView==='month'}>month</Button>
                        <Button color="dark" onClick={() => setCalendarView('year')} active={calendarView==='year'}>year</Button>
                    </ButtonGroup>
                </div>
            {calendar}

        </div>
    )
}