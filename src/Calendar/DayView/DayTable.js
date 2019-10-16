import React from 'react'
import moment from 'moment'

export default function DayTable(props) {
    var hours = []
    const startOfDay = moment().startOf('day')
    for (var i = 0; i < 24; i++) {
        hours[i] = moment(startOfDay).add(i, 'hour').format('H:mm')
    }
    
    var works = JSON.parse(localStorage.getItem('works'))
    works = works.filter(work => work.date === moment(props.day).format('DD MMM YYYY'))
    const hoursTable = []
    hours.map(hour => {
        var work = ''
        var workStyle = ''
        works.forEach(item => {
            if (item.time === hour) {
                work = item.title
                workStyle = item.type
            }
        });

        hoursTable.push(
        <div className="hour">

        <div className="time">{hour}</div>

        <div className="hourWork">
            <span className={`workItem ${workStyle}`}>{work}</span>
        </div>

        </div>)
    })
    return (
        hoursTable
    )
}