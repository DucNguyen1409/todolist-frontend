import { useState } from "react";

const Modal = ({ mode, setShowModal, getTodos, task }) => {
    const editMode = mode === 'edit' ? true : false;
    
    const [data, setData] = useState({
      title: editMode ? task.title : '',
      status: 'NEW',
      createdBy: '3d2a013a-3935-4150-8a86-d9969a8e23f2'
    });

    // func: create todo
    const createTodoTask = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8080/api/v1/todos', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.status === 201) {
          setShowModal(false);
          getTodos();
        }

      } catch(err) {
        console.log(err)
      }
    }

    // func: edit todo
    const editTodoTask = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:8080/api/v1/todos/${task.id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.status === 200) {
          setShowModal(false)
          getTodos()
        }
      } catch (err) {
        console.log(err)
      }
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
  