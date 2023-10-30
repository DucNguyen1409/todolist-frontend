import TickIcon from './TickIcon';
import Modal from './Modal';
import { useState } from 'react';

const ListItem = ({ task }) => {
    const [showModal, setShowModal] = useState(false)
    
    const onDelete = () => {

    };

    return (
     <li className="list-item">

        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
        </div>

        <div className="button-container">
          <button className='edit' onClick={() => setShowModal(true)}>Edit</button>
          <button className='delete' onClick={onDelete}>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task}/>}

      </li>
    );
  }
  
  export default ListItem;
  