import TickIcon from './TickIcon';
import Modal from './Modal';
import { useState } from 'react';

const ListItem = ({ task, getTodos }) => {
    const [showModal, setShowModal] = useState(false)
    
    // func: delete todo
    const deleteTodoTask = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:8080/api/v1/todos/${task.id}`, {
          method: "DELETE"
        });

        if (response.status === 200) {
          setShowModal(false)
          getTodos()
        }
      } catch (err) {
        console.log(err)
      }
    }

    return (
     <li className="list-item">

        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
        </div>

        <div className="button-container">
          <button className='edit' onClick={() => setShowModal(true)}>Edit</button>
          <button className='delete' onClick={deleteTodoTask}>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getTodos={getTodos} task={task} />}

      </li>
    );
  }
  
  export default ListItem;
  