import React from 'react';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div className="container mt-4">
        <div class="row d-flex d-flex align-items-center justify-content-center">
        <form>
            <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' />
            <MDBInput type='email' id='form4Example2' wrapperClass='mb-4' label='Email address' />
            <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Message' />

            <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form4Example4'
                label='Send me a copy of this message'
                defaultChecked
            />

            <MDBBtn type='submit' className='mb-4' block>
                Sign in
            </MDBBtn>
        </form>
        </div>
    </div>
  );
}