import React from 'react';
import ListItemComponent from './ListItemComponent';

function ListComponent(props) {
    const style = {
        list : {
            backgroundColor: '#533e5a',    
            boxShadow: '0px 4px 14px rgba(23, 25, 50, 0.5)',
            borderRadius: '10px',
            width: '362px',
            height: '378px',
            overflowY: 'scroll',
            opacity: '0.8'
        }   ,
        item : {
            marginLeft: '10vw;'
        }     
    };
    return (
        <div>
            <ul style={style.list}>
                {
                    props.data.map((item) => (
                        <li style={style.item} key={item.id}> <ListItemComponent listItem={item} deleteItem={props.deleteItem} updateList ={props.updateList} /></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListComponent;
