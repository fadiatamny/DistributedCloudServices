import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

function FormComponent(props) {
    const style = {
        formStyle: {
            width: '362px',
            height: '378px',
            background: '#533e5a',
            boxShadow: '0px 4px 14px rgba(23, 25, 50, 0.5)',
            borderRadius: '10px',
            opacity:'0.8'
        },
        titleStyle: {
            width: '327px',
            height: '48px',
            background: '#e5dcca',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
            marginBottom: '16px',
            marginTop: '30px',
            marginLeft: '17px'
        },
        bodyStyle: {
            width: '327px',
            height: '250px',
            background: '#e5dcca',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
            marginLeft: '17px'
        },
        submitStyle: {
            border: '0',
            padding: '0',
            backgroundColor: '#FD584200',
            position: 'relative',
            left: '154px',
            top: '8px',
        },
        circleStyle: {
            height: '54px',
            width: '54px',
            color: '#6d1010'
        }
    }

    const [title, setTitle] = React.useState([]);
    const [body, setBody] = React.useState([]);

    function formChange(e) {
        if (e.target.name == 'title')
            setTitle(e.target.value);
        if (e.target.name == 'body')
            setBody(e.target.value);
    }

    function submitForm(e) {
        e.preventDefault();
        props.pushItem(title, body);
        setTitle('');
        setBody('');
    }

    return (
        <div className="d-flex just">
            <form onSubmit={submitForm} style={style.formStyle} className="form-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Item Title..."
                    value={title}
                    onChange={formChange}
                    style={style.titleStyle}
                    className="form-control" />

                <input
                    type="textarea"
                    name="body"
                    placeholder="Item Body..."
                    value={body}
                    onChange={formChange}
                    style={style.bodyStyle}
                    className="form-control" />

                <button
                    type="submit"
                    style={style.submitStyle}>
                    <FaPlusCircle style={style.circleStyle} />
                </button>
            </form>
        </div>
    )
}



export default FormComponent;
