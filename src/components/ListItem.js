import TickIcon from './TickIcon';
import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { deleteToDoTask, updateToDoStatus } from '../api';

const ListItem = ({ task, getTodos }) => {
    const [cookies] = useCookies(null)
    const [showModal, setShowModal] = useState(false);
    const isCompleted = (task.status === 'NEW') ? false : true;
    
    // func: delete todo
    const deleteTodoTask = async (e) => {
      e.preventDefault();

      deleteToDoTask(task.id, cookies.AccessToken).then(() => {
        setShowModal(false)
        getTodos()
      })
    }

    // func: check complete task
    const updateTaskStatus = async () => {
      let status;
      if (isCompleted) {
        status = 'NEW';
      } else {
        status = 'COMPLETED';
      }

      updateToDoStatus(task.id, status, cookies.AccessToken).then(() => {
        getTodos()
      })
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
  