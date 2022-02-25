import {
    MDBInput,
    MDBBtn,
    MDBCol, MDBRow,
  } from 'mdb-react-ui-kit';

import {useState,React,useEffect} from 'react';
import { getDatabase, ref, set, child, get,onValue} from "firebase/database";

function Temp() {
    const [clipid,setClipid]=useState('');
    const [message,setMessage]=useState('');
    const [tempidexist,setTempidexist]=useState(false);
    const setmessage = (e) => {
        setMessage(e.target.value);
      };

    useEffect(()=>{
        //get id from the url using props
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        setClipid(id);
        const db = getDatabase();
        onValue(ref(db, '/Tempusers/' +id), (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setClipid(snapshot.val().clipid);
                setMessage(snapshot.val().message);
                setTimeout(()=>{
                    if(clipid!=='' && message!==''){
                        setTempidexist(true);
                    }
                },5000);
            }
        });
    },[clipid,message]);
    const createClipart=(e)=>{
        e.preventDefault();
        //upload the id and message to realtime database
        const dbRef = ref(getDatabase());
        set(child(dbRef, `Tempusers/${clipid}`), {
            clipid: clipid,
            message: message,
            time: new Date().toLocaleString(),
        });
        alert("Your clipart has been created"); 
        setClipid('');
        setMessage(''); 
    }
  return (
    <div>
        <h1 className='text_center'>Temp</h1>
        {
            tempidexist?
            <div className='text_center'>
            <h1>Your clipart has been created</h1>
            <h2>Your clipart id is {clipid}</h2>
            <h2>Your clipart message is {message}</h2></div>
            :
            <div>
                <MDBRow className='d-flex justify-content-center mt-5'>
                    <MDBCol md='6'>
                            <MDBInput id='clipid' wrapperClass='mb-4' label='Your CLIP-ID' value={clipid} />
                            <MDBInput wrapperClass='mb-4' textarea id='message' rows={4} label='Message' value={message} onChange={setmessage} />
                            <MDBBtn type='submit' className='mb-4' onClick={createClipart}>
                                Create Clip
                            </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </div>
        }
    </div>
  )
}

export default Temp