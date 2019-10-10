import React, { useState } from 'react'
import ToDoItem from './ToDoItem'
import moment from 'moment'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap'

export default function App() {
  const [isAddOpen, setAddOpen] = useState(false)
  const [isValid, setIsValid] = useState("invalid")
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [works, setWorks] = useState(JSON.parse(localStorage.getItem('works')) || []);
  const [dates, setDates] = useState(JSON.parse(localStorage.getItem('dates')));
  // console.log(works);

  function addDate() {
    if (localStorage.getItem('dates') === null) {
      const arr = []
      arr.push(date)
      localStorage.setItem('dates', JSON.stringify(arr))
      setDates(arr)
    } else {
      const arr = JSON.parse(localStorage.getItem('dates'));
      arr.push(date)
      localStorage.setItem('dates', JSON.stringify(arr))
      setDates(arr)
    }
  }

  function addWork() {
    if (localStorage.getItem('works') === null) {
      const arr = [];
      arr.push(title)
      localStorage.setItem('works', JSON.stringify(arr))
      setWorks(arr)
    } else {
      const arr = JSON.parse(localStorage.getItem('works'));
      // console.log(arr);
      arr.push(title)
      localStorage.setItem('works', JSON.stringify(arr))
      setWorks(arr)
    }
  }

  function add() {
    addWork();
    addDate();
    // document.location.reload()
  }

  function handleDelete(key) {
    var arr = JSON.parse(localStorage.getItem('works'))
    arr.splice(key, 1);
    localStorage.setItem('works', JSON.stringify(arr))

    arr = JSON.parse(localStorage.getItem('dates'))
    arr.splice(key, 1);
    localStorage.setItem('dates', JSON.stringify(arr))
    setWorks(arr);

    // document.location.reload();
    // console.log(arr);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDateChange(event) {
    var now = moment(event.target.value, "YYYY-MM-DD").format("D MMM YYYY");
    setDate(now);
    // console.log(now)
  }

  return(
    <div className="App">

      <div className="ToDo">
        
        {/* <div className="fixMenu">
            <div className="tabs">
              <Button color="danger">calendar</Button>
              <Button color="info">todo</Button>
            </div>
          </div> */}

        <div className="works">
        {works.map((work, index) => {
          return (
            < ToDoItem item={work} key={index} dataKey={index} date={dates[index]} handleDelete={handleDelete}/>
          )
        })}
        </div>
        
        
        <Form>

        <Modal isOpen={isAddOpen} toggle={() => setAddOpen(!isAddOpen)}>
            <ModalHeader toggle={() => setAddOpen(!isAddOpen)}>Add new task</ModalHeader>
            <ModalBody>
              <Input type="text" required placeholder="Task title here" onChange={handleTitleChange}/>
              <Input type="date" required onChange={handleDateChange}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {setAddOpen(!isAddOpen); add()}}>ok</Button>
              <Button color="secondary" onClick={() => setAddOpen(!isAddOpen)}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </Form>
          <div className="container text-right">
            <Button className="add" onClick={() => setAddOpen(!isAddOpen)} outline color="primary" style={{border: "none"}}>+</Button>
          </div>
        



        {/* <Input type="text" placeholder="add new task" onChange={handleTitleChange}/>
        <Input type="date" onChange={handleDateChange}/>
        <Input type="button" value="+" onClick={add}/> */}




      </div>




    </div>

  )
}
