import React from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBCol, MDBRow,
} from 'mdb-react-ui-kit';


function board() {
  return (
    <MDBRow className='d-flex justify-content-center mt-5'>
      <MDBCol md='6'>
        <form>
            <MDBInput id='clipid' wrapperClass='mb-4' label='Your CLIP-ID' />
            <MDBInput wrapperClass='mb-4' textarea id='message' rows={4} label='Message' />


            <MDBBtn type='submit' className='mb-4' block>
                Create Clip
            </MDBBtn>
        </form>
      </MDBCol>
    </MDBRow>
  )
}

export default board;