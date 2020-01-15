import React, { useState } from 'react';
import { MdEdit, MdDelete, MdSave } from 'react-icons/md';

export default function Idea (props) {
  const {
    onDelete,
    index,
    children,
    onChange
  } = props;
  const [editing, setEditing] = useState(false);

  let idea = {value: ''};
  const editIdea = () => setEditing(true);
  const deleteIdea = () => onDelete(index);
  const saveIdea = (event) => {
    event.preventDefault();
    console.log(idea.value, index);
    onChange(idea.value, index);
    setEditing(false);
  };

  function Form() {
    return (
      <div>
        <form>
          <textarea
            ref={element => idea = element}
            cols="30" rows="10" />
          <span>
            <button onClick={saveIdea}><MdSave /></button>
          </span>
        </form>
      </div>
    );
  }

  function UI() {
    return (
      <div className="idea">
        <div>{children}</div>
        <span>
          <button
            onClick={editIdea}
            className="btn btn-primary"
            style={{ marginRight: '7px' }}
          >
            <MdEdit />
          </button>
          <button
            onClick={deleteIdea}
            className="btn btn-primary"
            style={{ marginRight: '7px' }}
          >
            <MdDelete />
          </button>
        </span>
      </div>
    );
  }

  return editing ? <Form /> : <UI />;
}

