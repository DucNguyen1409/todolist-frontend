import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

const App = () => {
  const userId = '3d2a013a-3935-4150-8a86-d9969a8e23f2';
  const [ tasks, setTasks ] = useState(null)

  const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/todos/by-user/${userId}`) 
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => getTodos, [])

  const sortedTasks = tasks?.sort((a,b) => new Date(a.createdDate) - new Date(b.date))

  return (
   <div className="app">
    <ListHeader listName={'To do list'} getTodos={getTodos} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getTodos={getTodos} />)}
    </div>
  );
}

export default App;
