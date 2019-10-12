import React from 'react'
import { Table } from 'reactstrap'
import moment from 'moment'

const weekdays = moment.weekdaysShort()

export default function Calendar() {
    console.log(weekdays)
    var now = new Date();
    return (
        <div className="Calendar">
            <Table>
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                            {weekdays.map(day => {
                                return (
                                    <th>{day}</th>
                                )
                            })}
                    </tr>
                </thead>
            </Table>
        </div>
    )
}