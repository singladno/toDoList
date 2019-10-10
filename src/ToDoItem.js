import React, {useState} from 'react'
import { Button } from 'reactstrap'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import moment from "moment"
import { MDBIcon } from 'mdbreact'
import { Tooltip } from 'reactstrap'

export default function ToDoItem(props) {
	const [check, setCheck] = useState(false);
	// console.log(now)
	function 	handleCheck() {
		setCheck(!check)
	}
	const [itemType, setItemType] = useState(props.itemType)
	const [isOpen, setOpen] = useState(false)
	const [isCheckOpen, setCheckOpen] = useState(false);
	const [title, setTitle] = useState(props.item)
	const [isModalOpen, setModalOpen] = useState(false);
	const [date, setDate] = useState(props.date);

	function handleDateSubmit() {
		var arr = JSON.parse(localStorage.getItem('dates'))
		arr[props.dataKey] = date;
		localStorage.setItem('dates', JSON.stringify(arr))
		document.location.reload();
	}

	function handleDateChange(event) {
		var now = moment(event.target.value, "YYYY-MM-DD").format("D MMM YYYY")
		setDate(now)
		// console.log(date)
	}

	function	handleChange(event) {
		var arr = []
		arr = JSON.parse(localStorage.getItem('works'));
		setTitle(event.target.value)
		arr[props.dataKey] = event.target.value;
		localStorage.setItem('works', JSON.stringify(arr))
	}

	function	handleTypeChange(event) {
		var arr = []
		arr = JSON.parse(localStorage.getItem('types'))
		arr[props.dataKey] = event.target.value
		localStorage.setItem('types', JSON.stringify(arr))
		setItemType(event.target.value)
	}

	return(
		<div className="toDoItem">
			<Tooltip placement="top" isOpen={isCheckOpen} toggle={() => setCheckOpen(!isCheckOpen)} href="#" target="checkToolTip">
				Done
			</Tooltip>
			<Button size="sm" outline color="danger" className="check" onClick={() => props.handleDelete(props.dataKey)}>
				<MDBIcon icon="trash" />
			</Button>
			<div className="checkButton" id="checkToolTip">
				<Button size="sm" outline color="success" className="check" onClick={handleCheck}>&#10003;</Button>
			</div>

			<div className="toDoTitle">
				<p className="toDoTitle"
				>
					<input
					type="text"
					value={title}
					onChange={handleChange}
					style={check ? {textDecoration: "line-through"} : {textDecoration: "none"}}
					>

					</input>
				</p>
			</div>

			<div className="expiry">
				<span>expires: {props.date}</span>
				<div className="ml-3">
					<Button outline color="link" id="timeToolTip" onClick={() => setModalOpen(!isModalOpen)}>
						<Modal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)}>
							<ModalHeader toggle={() => setModalOpen(!isModalOpen)}>Choose the deadline</ModalHeader>
							<form>
								<ModalBody>
										<input onChange={handleDateChange} type="date" id="modalDate" className="container-fluid"></input>
								</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={() => { setModalOpen(!isModalOpen); handleDateSubmit()}}>Ok</Button>
									<Button color="secondary" onClick={() => setModalOpen(!isModalOpen)}>Cancel</Button>
								</ModalFooter>
							</form>
						</Modal>
							<MDBIcon far icon="clock"/>
						<Tooltip placement="right" isOpen={isOpen} toggle={() => setOpen(!isOpen)} href="#" target="timeToolTip">
							Change deadline
						</Tooltip>
					</Button>
				</div>
			</div>

			<div className="itemType">
				<input
				className="itemType"
				type="text"
				value={itemType}
				onChange={handleTypeChange}
				>
				</input>
			</div>

		</div>
	)
}
