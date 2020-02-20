import React, { useEffect } from 'react';
import * as Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';

function App() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setData(res.data))
      .catch(res => console.log(`Errurururururururururu ${res}`));
  }, []);

  function pushItem(title, body) {
    Axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body
    })
      .then(res => setData([...data, res.data]))
      .catch(res => console.log(`Errurururururururururu ${res}`));
  };

  function updateList(id, title, body) {
    Axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      body
    })
      .then(res => setData(data.map(item => item.id !== res.data.id ? item : res.data)))
      .catch(res => console.log(`Errurururururururururu ${res}`));
  };

  function deleteItem(id) {
    Axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => setData([...data.filter(item => item.id !== id)]))
    .catch(res => console.log(`Errurururururururururu ${res}`));
  }

  return (
    <div className="container background-image">
      <div className='parent-component d-flex justify-content-center'>
        <FormComponent pushItem={pushItem} />
        <div className='profile-picture'></div>
        <ListComponent data={data} deleteItem={deleteItem} updateList={updateList} />
      </div>
    </div>
  );
}

export default App;
