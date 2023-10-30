import { useState } from "react";

const Modal = ({ mode, setShowModal, task }) => {
    const editMode = mode === 'edit' ? true : false;
    
    const [data, setData] = useState({
      user_email: editMode ? task.user_email : null,
      title: editMode ? task.title : null,
      date: editMode ? "" : new Date()
    });
    //1:39

    const handleOnChange = (e) => {
      const {name, value} = e.target

      setData(data => ({
        ...data,
        [name] : value
      }))

      console.log(data)
    }

    return (
     <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>{mode} task</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>
          <form>
              <input 
                required 
                maxLength={30} 
                placeholder="Task name here" 
                name="title" 
                value={data.title} 
                onChange={handleOnChange}
                autocomplete="off"/>
              <br/>
              <input 
                className={mode} 
                type="submit" />
            </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  