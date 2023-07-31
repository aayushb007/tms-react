import React, { useState, useRef } from 'react'

const TaskItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: props.id,
    title: props.title,
    desc: props.desc,
    due_date: props.due_date,
    status: props.status,
  });

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleDelete = () => {
    props.onTaskDelete(editedTask.id)
  }
  const ref = useRef(null)
  const closeref = useRef(null)
  const handleClick = (e) => {
    console.log('editedTask:', editedTask);
    props.onTaskEdit(editedTask.id, editedTask);
    ref.current.click();

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="card"  >
        <div className="card-body" >
          <h5 className="card-title" onClick={handleToggleDetails}>{props.title}</h5>

          {showDetails && (
            <>
              <p className="card-text">Description: {props.desc}</p>
              <p className="card-text">Due Date: {props.due_date}</p>
              <p className="card-text">Status: {props.status}</p>
            </>
          )}
          <button className='btn btn-sm btn-primary mx-2' onClick={handleClick} >Edit</button>
          <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>

        </div>


      </div>



      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" value={editedTask.title} onChange={handleInputChange} id="title" aria-describedby="emailHelp" name="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input type="text" className="form-control" value={editedTask.desc} onChange={handleInputChange} id="desc" name='desc' />
                </div>
                <div className="mb-3">
                  <label htmlFor="due_date" className="form-label">Due Date</label>
                  <input type="date" className="form-control" value={formatDateForInput(editedTask.due_date)} onChange={handleInputChange} id="due_date" name='due_date' />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" name='status' onChange={handleInputChange} aria-label="Default select example">
                    <option selected disabled>Select Status</option>
                    <option value="Complete" selected={editedTask.status === 'Complete'}>Complete</option>
                    <option value="Pending" selected={editedTask.status === 'Pending'}>Pending</option>
                    <option value="Closed" selected={editedTask.status === 'Closed'}>Closed</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Edit changes</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default TaskItem