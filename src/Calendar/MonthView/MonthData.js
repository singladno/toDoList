import React, { useState, useEffect, createRef, useRef } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Table } from 'reactstrap'

// const tdRefs = []
var data = []
export function CalendarCell(props) {

    var works = JSON.parse(localStorage.getItem('works'))
    var text 
    var style
    // console.log(moment(props.daysArr).add(props.i, 'day'))
    works.forEach(work => {
        if (moment(work.date).format('DD-MM-YYYY') === moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY')) {
            text = work.title
            style = work.type
        }
    });
    var cell = moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY');
    return (
        <td className="table-bordered tdMonth">
            <div className="cellMonth">{moment(props.daysArr).add(props.i, 'day').format('D')}</div>
            <div className={`workCell ${cell} ${style}`}>{text}</div>
        </td>
    )
}

export function CalendarMonthWeek(props) {
    const monthWeek = []

    for (let i = 0; i < 7; i++) {
        monthWeek.push(< CalendarCell key={i} i={i} daysArr={props.daysArr} />)
    }
    return (
        <tr>
            {monthWeek}
        </tr>
    )

}

export function CalendarMonthData(props) {
    const monthData = []
    for (let i = 0; i < 5; i++) {
        monthData.push(
            < CalendarMonthWeek key={i} daysArr={props.daysArr[i * 7]} />
        )
    }
    return (
        <tbody>
            {monthData}
        </tbody>
    )
}

export default function MonthData() {
    const daysOfWeek = moment.weekdaysShort()
    const startOfMonth = moment().startOf('month').startOf('week').add(1, 'day')
    const [month, setMonth] = useState()
    const daysInMonth = moment(month).daysInMonth()
    const [daysArr, setDaysArr] = useState({})

    useEffect(() => {
        getDaysArr()
    }, [month])


    // useEffect(() => {
    //     handleRefs()
    // }, [month])

    // function handleRefs() {
    //     var arr = []
    //     arr = JSON.parse(localStorage.getItem('works'))
    //     for (var key in arr) {
    //         var date = moment(arr[key].date).format("DD-MM-YYYY")
    //         for (var td in tdRefs) {
    //             console.log(tdRefs[td])
    //         }
    //     }
    // }

    function getDaysArr() {
        let arr = []
        for (var i = 0; i < daysInMonth; i++) {
            arr.push(moment(startOfMonth).add(i, 'days'))
        }
        setDaysArr(arr)
    }

    data = []
    data.push(
        <div className="calendarMonth container">
            {/* <button onClick={handleRefs}>show</button> */}
            <Table className="calendarMonthTable">
                <thead>
                    <tr className="weekDaysMonth">
                        {daysOfWeek.map((day, index) => {
                            if (index > 0) {
                                return (
                                    <th>{day}</th>
                                )
                            }
                        })}
                        <th>{daysOfWeek[0]}</th>
                    </tr>
                </thead>

                < CalendarMonthData daysArr={daysArr} daysInMonth={daysInMonth} />

            </Table>
        </div>
    )
    return data
}