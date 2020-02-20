import React from 'react';
import {FaPen , FaTrash, FaSave} from 'react-icons/fa';

function ListItemComponent(props) {

    const [editing, setEditing] = React.useState(false);
    const [editItem, setEditItem] = React.useState({id: props.listItem.id,title: props.listItem.title, body: props.listItem.body});

    console.log(editItem);
    const style = {
        item: {
            height: '62px',
            width: '100%',
            color: '#fff',
            fontHeight: '26px',
            paddingLeft: '16px',
            paddingTop: '19px',
            borderBottom: '1px #fff solid',
        },
        delete: {
            float: 'right',
            marginRight: '17px',
            color: '#FD5842'

        },
        edit: {
            float: 'right',
            marginRight: '16px'
        },
        title: {
            position: 'relative',
            marginLeft: '05.198776758%',
            marginTop: '04.761904761%',
            width: '20.4375vw',
            height: '05.33vh',
            background: '#FFF',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',

        },
        body: {
            position: 'relative',
            marginLeft: '05.198776758%',
            marginTop: '04.761904761%',
            width: '20.4375vw',
            height: '30.55vh',
            background: '#FFF',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
        },
        submit: {
            border: '0',
            padding: '0',
            backgroundColor: '#FD584200',
            position: 'relative',
            marginLeft: '42.54%',
            marginTop: '-2.857%'
        },
        save: {
            height: '54px',
            width: '54px',
            color: '#FD5842'
        }
    };

    function updateChange(e){
        if (e.target.name == 'title')
            setEditItem({id:editItem.id,title:e.target.value,body:editItem.body});
        if (e.target.name == 'body')
            setEditItem({id:editItem.id,title:editItem.title,body:e.target.value});
    };

    function submitEdit(e){
        e.preventDefault();
        props.updateList(editItem.id, editItem.title , editItem.body);
        setEditing(false);
    };

    function editView(id, title, body) {
        return (
            <div>
                <form onSubmit={submitEdit} className="form-group">
                    <input
                        type="text"
                        name="title"
                        value={editItem.title || ''}
                        onChange={updateChange}
                        style={style.title}
                        className="form-control" />

                    <input
                        type="textarea"
                        title="body"
                        value={editItem.body || ''}
                        onChange={updateChange}
                        style={style.body}
                        className="form-control" />

                    <button
                        type="submit"
                        style={style.submit}>
                        <FaSave style={style.save} />
                    </button>
                </form>
            </div>
        )
    };

    function listView(id, title, body) {
        let titleToShow = title;
        if (titleToShow.length > 20)
            titleToShow = titleToShow.slice(0, 19) + "..."

        return (

            <div style={style.item}>
                <span>{titleToShow}</span>
                <FaTrash className="delete" style={style.delete} onClick={props.deleteItem.bind(this, id)} />
                <FaPen className="edit" style={style.edit} onClick={()=>{setEditing(!editing);}} />
            </div>
        )
    };

    const {id, title, body} = props.listItem;
    return editing ? editView(id, title, body) : listView(id, title, body);
}

export default ListItemComponent;
