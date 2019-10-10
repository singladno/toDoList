import React, { useState } from 'react'
import ToDoItem from './ToDoItem'
import moment, { max } from 'moment'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap'
import { tsPropertySignature } from '@babel/types'

export default function App() {
  const [isAddOpen, setAddOpen] = useState(false)
  const [isValid, setIsValid] = useState("invalid")
  const [title, setTitle] = useState();
  const [itemType, setItemType] = useState();
  const [date, setDate] = useState();
  const [works, setWorks] = useState(JSON.parse(localStorage.getItem('works')) || []);
  // console.log(works);

  function getMaxId(arr) {
    var maxId = 0
    arr.forEach(item => {
      if (item.id > maxId) {
        maxId = item.id
      }
    });
    return maxId
  }

  function addItem() {
    var arr = JSON.parse(localStorage.getItem('works'))
    var id
    id = getMaxId(arr) + 1
    console.log(id)
    arr.push({
      id: id,
      date: date,
      type: itemType,
      title: title
    })
    localStorage.setItem('works', JSON.stringify(arr))
    setWorks(arr);
  }
  
  function handleDelete(key) {
    var arr = JSON.parse(localStorage.getItem('works'))
    // console.log(key)
    arr = arr.filter(item => item.id !== key)
    localStorage.setItem('works', JSON.stringify(arr))
    setWorks(arr)
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTypeChange(event) {
    setItemType(event.target.value);
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
        {works.map((work) => {
          return (
            < ToDoItem item={work.title} itemType={work.type} key={work.id} dataKey={work.id} date={work.date} handleDelete={handleDelete} setWorks={setWorks}/>
          )
        })}
        </div>
        
        
        <Form>

        <Modal isOpen={isAddOpen} toggle={() => setAddOpen(!isAddOpen)}>
            <ModalHeader toggle={() => setAddOpen(!isAddOpen)}>Add new task</ModalHeader>
            <ModalBody>
              <Input type="text" required placeholder="title" onChange={handleTitleChange}/>
              <Input type="select" required 
              onChange={handleTypeChange}>
                <option>-- type --</option>
                <option>important</option>
                <option>very important</option>
                <option>routine</option>
                <option>work</option>
                <option>family</option>
                <option>friends</option>
                <option>leisure</option>
              </Input>
              <Input type="date" required onChange={handleDateChange}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {setAddOpen(!isAddOpen); addItem()}}>ok</Button>
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
