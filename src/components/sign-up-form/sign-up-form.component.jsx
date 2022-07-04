import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss';

import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {  //initial values
    displayName:'',
    email:'',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; //de-construct the 4 values I want
    
    //clear the fields after sign up
    const resetFormFields = () =>{
        setFormFields(defaultFormFields); //calls function setformfields with the empty formfields state
    }

    const handleSubmit = async (event) => { //triggers onsubmit event handler so we need -event
        event.preventDefault(); //I will handle everything
        if (password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
                        
            //creating the new user doc on firebase
            await createUserDocumentFromAuth(user, {displayName} );
            resetFormFields(); //reseting the fields

        } catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use');
            }else {
            console.log('user creation error', error);
            }
        }
    };

    // func takes input event on text change
    const handleChange = (event) =>{
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value }); //update the value name that changed
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} />
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
                <FormInput
                    label="confirmPassword" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} />
                <Button type="submit"> Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;