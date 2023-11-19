import { useState } from "react";
import { createToDoAPI, editToDoTask } from "../api";
import { getLocalStorageItemByKey } from "../utils/LocalStorageUtils";
import { Authenticate } from "../utils/constants";

const Modal = ({ mode, setShowModal, getTodos, task }) => {
    const editMode = mode === 'edit' ? true : false;
    
    const [data, setData] = useState({
      title: editMode ? task.title : '',
      status: 'NEW',
      createdBy: getLocalStorageItemByKey(Authenticate.USER_ID)
    });

    // func: create todo
    const createTodoTask = async (e) => {
      e.preventDefault();

      createToDoAPI(data).then(() => {
        setShowModal(false);
        getTodos();
      });
    }

    // func: edit todo
    const editTodoTask = async (e) => {
      e.preventDefault();

      editToDoTask(task.id, data).then(() => {
        setShowModal(false)
        getTodos()
      })
    }

    const handleOnChange = (e) => {
      const {name, value} = e.target

      setData(data => ({
        ...data,
        [name] : value
      }))
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
                autoComplete="off"/>
              <br/>
              <button 
                className={mode}
                type="submit"
                onClick={ editMode ? editTodoTask : createTodoTask }>
                  Submit
              </button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  