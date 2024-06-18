
import React, { useState, useEffect } from 'react'
import './ChatWindow.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DMsideNav from '../DMNav/DMsideNav';
import HeaderPHI from '../Header/Header';
function DisplaYMessagePHI() {

    const [message, setMessage] = useState("")
    // const [message,setmessage] =useState("")


    function getMessage() {
        axios.get(`http://localhost:8090/message/display`).then((res) => {
            setMessage(res.data)
        }).catch((err) => {
            alert(err)
        })

    }
    useEffect(() => {
        getMessage()
    }, []);
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8090/message/delete/${id}`).then(() => {
            alert("converstaion deleted")
            window.location.reload()
        }).catch((err) => {
            alert(err)
            console.log(err)
        })

    }
    const deleteAllMesages = () => {
        axios.delete(`http://localhost:8090/message/resources`).then(response => {
            alert("all the messages are deleted")
            window.location.reload()
        }).catch((err) => {
            alert(err)
        })
    }
    const filerData = (message, searchkey) => {
        const result = message.filter((message) =>
            message.subject.toLowerCase().slice(0, 4).includes(searchkey.toLowerCase()));
        setMessage(result)
    };
    const handleSearchArea = (e) => {
        const searchkey = e.currentTarget.value;
        axios.get('http://localhost:8090/message/display', {}).then((res) => {
            filerData(res.data, searchkey);

        }).catch((err) => {
            alert(err)
        })


    }
    function formatTimestamp(timestamp) {
        // Assuming timestamp is a UNIX timestamp (in milliseconds)
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }

    function formatDate(timestamp) {
        // Assuming timestamp is a UNIX timestamp (in milliseconds)
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }

    return (
        <>
            <HeaderPHI />
            <DMsideNav />
            <div style={{ marginLeft: "300px" }}>
                <div classname="chat-window">
                    <h2>Sent notices</h2>
                    <div style={{ marginLeft: '800px', marginTop: '-20px' }}>
                        <button onClick={deleteAllMesages} className="btn btn-danger">delete chat</button>

                        <Link to="/createmessage" className="btn btn-success" style={{ marginLeft: '50px' }}>Type a new message</Link>
                        <div style={{ marginLeft: '-300px', marginTop: '-30px', display: 'flex' }}>
                            <input type="text" onChange={handleSearchArea} placeholder='Search by subject' />
                            <button >search</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="message">
                        {message && message.map && message.map((msg, index) => (
                            <div key={index} className={msg.sender === 'You' ? 'message sent' : 'message received'}>
                                <strong>{msg.subject}</strong>
                                <button className="btn btn-success" style={{ marginLeft: '520px' }} onClick={() => { handleDelete(msg?._id) }}>Delete</button>
                                {/* <button className='btn btn-danger' onClick={() => handleDelete(message._id)}>del</button> */}


                                <hr></hr>
                                <p>{msg.textMessage}</p>
                                <hr></hr>
                                <small>Sent on {formatTimestamp(msg.timestamp)}</small>    </div>
                        ))}
                    </div>

                </div>

            </div>
        </>

    )
}



export default DisplaYMessagePHI
