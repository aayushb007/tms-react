import React, { useContext, useState } from 'react'
import TaskContext from '../../context/taskContext';
function AddTask(props) {
    const context = useContext(TaskContext);
    const apiUrl = 'http://localhost:3002/task';
    const {addTask,getTask} = context;
    const [task, setTasks] = useState({ title: "", desc: "", due_date: "", status: "" });
    // const addTask = () => {
    //     const sanitizedTask = JSON.parse(JSON.stringify(task).replace(/'/g, '"'));

    //     fetch(apiUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(sanitizedTask)
    //     }).then((response) => {
    //         console.log(response);
    //         props.fetchTask();

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    const handleClick = (e) => {
        e.preventDefault();
        addTask(task);

    }
    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setTasks((prevTask) => ({ ...prevTask, [name]: value }));

    }
    return (
        <div className='container bg-dark text-light p-3'>
            <h1>Create Task</h1>

            <form >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} id="title" aria-describedby="emailHelp" name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} id="desc" name='desc' />
                </div>
                <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">Due Date</label>
                    <input type="date" className="form-control" onChange={onChange} id="due_date" name='due_date' />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-select" name='status' onChange={onChange} aria-label="Default select example">
                        <option selected disabled>Select Status</option>
                        <option value="Complete">Complete</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddTask