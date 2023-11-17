import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
import { fetchToDosAPI } from './api';

const App = () => {
  const [cookies] = useCookies(null)
  const authToken = cookies.AccessToken;
  const userId = cookies.UserId;
  const userName = cookies.UserName;
  const [ tasks, setTasks ] = useState(null)

  const getTodos = async () => {
    fetchToDosAPI(userId, authToken).then((response) => {
      setTasks(response);
    });
  }

  useEffect(() => {
    if (authToken) {
      getTodos()
    }
  }, [])

  // sort task by created date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.createdDate) - new Date(b.date))

  return (
   <div className="app">
    { !authToken && <Auth/>}

    { authToken &&
      <>
        <ListHeader listName={'To do list'} getTodos={getTodos} />
        <p className='user-name'>Welcome {userName}!</p>
        { sortedTasks?.map((task) => <ListItem key={task.id} task={task} getTodos={getTodos} />)}
      </>
    }
    </div>
  );
}

export default App;
