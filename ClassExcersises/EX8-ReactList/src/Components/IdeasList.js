import React, {
  useState,
  useEffect
} from 'react';
import Idea from './Idea';
import {
  MdAdd
} from 'react-icons/md';
// import data from '../data/data.json';

export default function IdeasList() {
  const [ideas, setIdeas] = useState([]);

  useEffect(async () => {
    let data = [];
    try {
      data = await fetch('http://localhost:1337/api/ideas/read').then(res => res.json());

    } catch (err) {
      if (err) console.log(err);
    };
    const loadIdeas = data.map(item => ({ id: item.id, idea: item.idea, group: item.group }));
    setIdeas(loadIdeas);
  }, []);

  const updateIdea = (newIdea, i) => {
    setIdeas(prevState => prevState.map(data => data.id !== i ? data : {
      ...data,
      idea: newIdea
    }));

  };
  const deleteIdea = (id) => {
    console.log(`deleted: ${id}`);
    setIdeas(prevState => prevState.filter(idea => idea.id !== id));
  };
  const nextID = (ideas = []) => {
    let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);

    return ++max;
  };
  const addIdea = ({
    event = null,
    id = null,
    txt = 'default title',
    group = 'default group'
  }) => {
    console.log(event, id, txt, group);
    setIdeas(prevState => ([
      ...prevState, {
        id: id !== null ? id : nextID(prevState),
        idea: txt,
        group: group,
      }
    ]))
  };

  const renderEachIdea = (item, i) => {
    return (
      <div
        key={`container${item.id}`}
        className="card"
        style={{ width: '18rem', marginBottom: '7px' }}
      >
        <div className="card-body">
          <Idea
            index={item.id}
            onChange={updateIdea}
            onDelete={deleteIdea}
          >
            {console.log(item)}
            <h5 className="card-title">{item.idea}</h5>
            <p className="card-text">{item.group}</p>
          </Idea>
        </div>
      </div>
    );
  };

  return (
    <div className="ideasList">
      {ideas.map(renderEachIdea)}
      <button
        id="add"
        onClick={addIdea}
        className="btn btn-primary"
        style={{ marginRight: '7px' }}
      >
        <MdAdd />
      </button>
    </div>
  );
}