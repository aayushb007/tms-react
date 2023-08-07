import {useState} from 'react';
import TaskContext from './taskContext';

function TaskState(props) {
    const apiUrl = 'http://localhost:3002/task'
    const taskInitial = [

    ]
    const addTask = async (task) =>{
        const sanitizedTask = JSON.parse(JSON.stringify(task).replace(/'/g, '"'));

     const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedTask)
    });
    const data = await res.json();
    setTasks([...tasks,data]);
    }
    const getTask = async () =>{
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });
        const data = await res.json();
        setTasks(data);
    }
    const deleteTask = async (id) =>{
     const res = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        //   const data = await res.json();
          setTasks((prevTask)=>prevTask.filter(task => task._id !== id))
    }
    const editTask = async () =>{
        
    }
    const [tasks, setTasks] = useState(taskInitial);
 console.log('tasks', tasks);
  return (
    <TaskContext.Provider value={{ tasks,addTask,deleteTask,getTask,editTask}}>
        {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;