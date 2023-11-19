import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import { fetchToDosAPI } from './api';
import { getLocalStorageItemByKey } from './utils/LocalStorageUtils';
import { Authenticate } from './utils/constants';

const App = () => {
  const authToken = getLocalStorageItemByKey(Authenticate.ACCESS_TOKEN);
  const userId = getLocalStorageItemByKey(Authenticate.USER_ID);
  const userName = getLocalStorageItemByKey(Authenticate.USER_NAME);
  
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
