import { useState } from "react";
import { useCookies } from "react-cookie";
import { createToDoAPI, editToDoTask } from "../api";

const Modal = ({ mode, setShowModal, getTodos, task }) => {
    const [cookies] = useCookies(null)
    const editMode = mode === 'edit' ? true : false;
    
    const [data, setData] = useState({
      title: editMode ? task.title : '',
      status: 'NEW',
      createdBy: cookies.UserId
    });

    // func: create todo
    const createTodoTask = async (e) => {
      e.preventDefault();

      createToDoAPI(data, cookies.AccessToken).then(() => {
        setShowModal(false);
        getTodos();
      });
    }

    // func: edit todo
    const editTodoTask = async (e) => {
      e.preventDefault();
      // try {
      //   const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
      //     method: "PUT",
      //     headers: { 
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${cookies.AccessToken}`
      //     },
      //     body: JSON.stringify(data)
      //   });

      //   if (response.status === 200) {
      //     setShowModal(false)
      //     getTodos()
      //   }
      // } catch (err) {
      //   console.log(err)
      // }

      editToDoTask(task.id, data, cookies.AccessToken).then(() => {
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
  