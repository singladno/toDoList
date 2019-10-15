import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Table } from 'reactstrap'


export function CalendarCell(props) {
    const calendarCellRef = useRef(moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY'));
    return (
        <td className="table-bordered tdMonth">
            <div className="cellMonth">{moment(props.daysArr).add(props.i, 'day').format('D')}</div>
            <div ref={calendarCellRef} className={`workCell ${moment(props.daysArr).add(props.i, 'day').format('DD-MM-YYYY')}`}></div>
        </td>
    )
}

export function CalendarMonthWeek(props) {
    const monthWeek = []

    for (let i = 0; i < 7; i++) {
        monthWeek.push(< CalendarCell i={i} daysArr={props.daysArr} />)
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
            < CalendarMonthWeek daysArr={props.daysArr[i * 7]} />
        )
    }
    return (
        <tbody>
            {monthData}
        </tbody>
    )
}

export default function CalendarMonth() {
    const daysOfWeek = moment.weekdaysShort()
    const startOfMonth = moment().startOf('month').startOf('week').add(1, 'day')
    const [month, setMonth] = useState()
    const daysInMonth = moment(month).daysInMonth()
    const [daysArr, setDaysArr] = useState({})

    useEffect(() => {
        getDaysArr()
    }, [month])


    useEffect(() => {
        var arr = []
        arr = JSON.parse(localStorage.getItem('works'))
        for (var key in arr) {
            var date = moment(arr[key].date).format("DD-MM-YYYY")
            // var el = document.getElementsByClassName(`workCell ${date}`)
            // var el = document.querySelectorAll("div.workCell")

            // var el = ReactDOM.findDOMNode(date.toString())

            // console.log(el)
            // if (el.length) {
            //     el.innerHTML = "a"
            //     console.log(el)
            // }
        }
    }, [month])


    function getDaysArr() {
        let arr = []
        for (var i = 0; i < daysInMonth; i++) {
            arr.push(moment(startOfMonth).add(i, 'days'))
        }
        setDaysArr(arr)
    }

    return (
        <div className="calendarMonth container">
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
}