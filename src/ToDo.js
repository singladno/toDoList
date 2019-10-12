import React, { useState } from 'react'
import ToDoItem from './ToDoItem'
import moment, { max } from 'moment'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap'
// export function Arrow(props) {
//   var source 
//   if (props.arrow === 'up') {
//     source = 'arrow-up.svg'
//   } else if (props.arrow === 'down') {
//     source = 'arrow-down.svg'
//   } else {
//     source = ''
//   }
//   return (
//     <img src={source}></img>
//   )
// }

export default function ToDo() {
  const [isAddOpen, setAddOpen] = useState(false)
  const [isValid, setIsValid] = useState("invalid")
  const [title, setTitle] = useState();
  const [itemType, setItemType] = useState();
  const [date, setDate] = useState();
  const [works, setWorks] = useState(JSON.parse(localStorage.getItem('works')) || []);
  const [sort, setSort] = useState()
  const [rotate, setRotate] = useState('')
  const [showTypeArrow, setShowTypeArrow] = useState(false)
  const [showDateArrow, setShowDateArrow] = useState(false)
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

  function sortByDate() {
    var arr = JSON.parse(localStorage.getItem('works'))
    arr.sort((a, b) => {
      if (moment(a.date).isAfter(moment(b.date))) {
        return 1
      }
      if (moment(a.date).isBefore(moment(b.date))) {
        return -1
      }
      return 0
    })
    localStorage.setItem('works', JSON.stringify(arr))
    // setUpDown('up')
    setWorks(arr)

  }
  
  function sortByType() {
    var arr = JSON.parse(localStorage.getItem('works'))
    arr.sort((a, b) => {
      if (a.type > b.type) {
        return 1
      }
      if (a.type < b.type) {
        return -1
      }
      return 0
    })
    localStorage.setItem('works', JSON.stringify(arr))
    setWorks(arr)
  }

  function handleSort(type) {
    if (type !== sort) {
      if (type === 'date') {
        sortByDate()
        setShowDateArrow(true)
        setShowTypeArrow(false)
      } else {
        sortByType()
        setShowTypeArrow(true)
        setShowDateArrow(false)
      }
    } else {
      if (rotate === 'rotate') {
        setRotate('')
      } else {
        setRotate('rotate')
      }
      var arr = JSON.parse(localStorage.getItem('works'))
      arr.reverse()
      localStorage.setItem('works', JSON.stringify(arr))
      setWorks(arr)
    }

  }

  return(
    <div className="ToDo">

        
        <div className="sort">
          <Button color="click" onClick={() => {handleSort('type'); setSort('type')}}><span>type </span>
          
            {showTypeArrow ? 
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="10px" height="10px" viewBox="0 0 284.929 284.929" className={rotate}>  
          <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z"/>
          </svg> 
              : 
              ""
            }
          

          </Button>

          <Button color="click" onClick={() => {handleSort('date'); setSort('date')}}><span>date </span>
          
          
            {showDateArrow ? 
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="10px" height="10px" viewBox="0 0 284.929 284.929" className={rotate}>  
          <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z"/>
          </svg> 
              : 
              ""
            }
          
          
          </Button>
        </div>

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

  )
}
