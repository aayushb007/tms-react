import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const Tasks = () => {
  const apiUrl = 'http://localhost:3002/task'
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(false);
  const fetchTasks = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      })
  }
  useEffect(() => {
    fetchTasks();
  }, [])
  const editTasks = (taskId, updatedTaskData) => {
    console.log('Function called', taskId, updatedTaskData);
    fetch(`${apiUrl}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTaskData)
    }).then((response) => {
      console.log(response);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, ...updatedTaskData } : task))
      );
    }).catch((err) => {
      console.log(err);
    })
  }
  const deleteTask = (taskId) => {
    fetch(`${apiUrl}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleToggleDetails = () => {
    setFlag(!flag);
  }

  let closedCount = 0;
  let pendingCount = 0;
  let openCount = 0;

  tasks.forEach((task) => {
    if (task.status === 'Complete') {
      closedCount++;
    } else if (task.status === 'Pending') {
      pendingCount++;
    }
  });

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className="col-md-3 my-2" > <div className="card bg-dark text-light text-center"><div className='card-title mx-3 my-4 '><h5>Total Task <br></br>
            {tasks.length} </h5></div></div></div>
          <div className="col-md-3 my-2" > <div className="card bg-dark text-light text-center"><div className='card-title mx-3 my-4'><h5>Completed Tasks <br></br>
            {closedCount}</h5></div></div></div>
          <div className="col-md-3 my-2" > <div className="card bg-dark text-light text-center"><div className='card-title mx-3 my-4'><h5>Open Tasks <br></br>
            {openCount}</h5></div></div></div>
          <div className="col-md-3 my-2" > <div className="card bg-dark text-light text-center"><div className='card-title mx-3 my-4 '><h5>Pending Tasks<br></br>
            {pendingCount}</h5></div></div></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-4 my-2" key={task._id}>
              <TaskItem id={task._id} title={task.title} desc={task.desc} due_date={task.due_date} status={task.status} onTaskEdit={editTasks} onTaskDelete={deleteTask} />
            </div>
          ))}
          <div className="col-ms-4 my-2">
            <button className='btn btn-light' onClick={handleToggleDetails}> ➕</button></div>
          {flag && (
            <AddTask fetchTask={fetchTasks} />
          )}
        </div>
      </div>
    </>
  )
}

export default Tasks