import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

const App = () => {
  const userId = '55bce169-38c2-4494-b117-9ec818095726'
  const [ tasks, setTasks ] = useState(null)

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8080/api/v1/todos/by-user/${userId}`) 
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => getData, [])

  console.log(tasks)

  const sortedTasks = tasks?.sort((a,b) => new Date(a.createdDate) - new Date(b.date))

  return (
   <div className="app">
    <ListHeader listName={'To do list'} />
    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} />)}
    </div>
  );
}

export default App;
