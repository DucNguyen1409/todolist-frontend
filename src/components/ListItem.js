import TickIcon from './TickIcon';
import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const ListItem = ({ task, getTodos }) => {
    const [cookies] = useCookies(null)
    const [showModal, setShowModal] = useState(false);
    const isCompleted = (task.status === 'NEW') ? false : true;
    
    // func: delete todo
    const deleteTodoTask = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
          method: "DELETE", 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.AccessToken}`
          }
        });

        if (response.status === 200) {
          setShowModal(false)
          getTodos()
        }
      } catch (err) {
        console.log(err)
      }
    }

    // func: check complete task
    const updateTaskStatus = async () => {
      let status;
      if (isCompleted) {
        status = 'NEW';
      } else {
        status = 'COMPLETED';
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}?status=${status}`, {
          method: "PATCH",
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.AccessToken}`
          }
        });

        if (response.status === 200) {
          getTodos()
        }
      } catch (err) {
        console.log(err)
      }
    }

    return (
     <li className={isCompleted ? "list-item done" : "list-item"}>
        <div 
          className="info-container" 
          onClick={updateTaskStatus}
        >
          <TickIcon />
          <p className="task-title">{task.title}</p>
        </div>

        <div className="button-container">
          <button
            className='edit' 
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
          <button
            className='delete' 
            onClick={deleteTodoTask}
          >
            Delete
          </button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getTodos={getTodos} task={task} />}

      </li>
    );
  }
  
  export default ListItem;
  