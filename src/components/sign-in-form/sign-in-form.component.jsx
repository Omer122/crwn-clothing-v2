import { useState } from 'react';
import { 
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils'
    
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';

import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {  //initial values
    email:'',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields; //de-construct the 2 values I want

    console.log(formFields);
    
    //clear the fields after sign up
    const resetFormFields = () =>{
        setFormFields(defaultFormFields); //calls function setformfields with the empty formfields state
    }

    const handleSubmit = async (event) => { //triggers onsubmit event handler so we need -event
        event.preventDefault(); //I will handle everything
        
        try{
            const response = await signInAuthWithEmailAndPassword(email, password);
            //get the user's access token\uid from firebase==authentication
            console.log(response);
            resetFormFields();
        } catch(error){
            console.log(error);
            switch(error.code){
                case 'auth/user-not-found':
                    alert('Email Not Found');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect Password for this Email!!!');
                    break;
                default:
                    console.log(error);
        
            }
        }
    };

    // func takes input event on text change
    const handleChange = (event) =>{
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value }); //update the value name that changed
    };

    const signInWithGoogle = async ()=> {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    return (
        <div className='sign-in-container'>
            <h2>Already Signed-in</h2>
            <span>Sign in with your email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} />
                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} />
                <div className='buttons-container'>
                    <Button type="submit" onClick={signInAuthWithEmailAndPassword}> Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                {/* added type="button" so google button won't cause alert */}

            </form>
        </div>
    );
};

export default SignInForm;