import React, { useState } from 'react'
import moment from 'moment'
import DayHeader from './DayHeader'
import DayTable from './DayTable'

export default function CalendarDay() {
    const [day, setDay] = useState(moment())
    return (
        <div className="dayView container">
            < DayHeader day={day} setDay={setDay}/>
            < DayTable day={day}/>

        </div>
    )
}