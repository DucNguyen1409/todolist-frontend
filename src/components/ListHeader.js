import Modal from './Modal';
import { useState } from 'react';

const ListHeader = ({ listName, getTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log('signout')
  }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="create" onClick={() => setShowModal(true)}>Add new</button>
          <button className="signout" onClick={signOut}>Sign out</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getTodos={getTodos} />}
      </div>
    );
  }
  
  export default ListHeader;
  