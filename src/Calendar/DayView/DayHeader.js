import React, { useState } from 'react'
import moment from 'moment'
import { Button, ButtonGroup } from 'reactstrap'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io"

export default function DayHeader(props) {
    
    return (
        <div className="dayHeader">
            <div className='container'>
                <ButtonGroup>
                    <Button color='link' onClick={() => props.setDay(moment(props.day).subtract(1, 'day'))}><IoIosArrowBack /></Button>
                    <span className="date">{moment(props.day).format('DD MMM YYYY')}</span>
                    <Button color='link' onClick={() => props.setDay(moment(props.day).add(1, 'day'))}><IoIosArrowForward /></Button>
                </ButtonGroup>
            </div>
        </div>
    )
}