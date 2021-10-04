import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
//import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
//import { loginUser } from '../../redux/actions/auth';

const SignInForm = () => {
  //const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Password must be 6 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // dispatch(loginUser(values));

        setSubmitting(false);
      }}
    >
      <Form className='sign-in-form'>
        <h3>Sign In To Your Account</h3>
        <small className='text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eius.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eius.
        </small>
        <FormGroup className='mt-5'>
          <FormLabel htmlFor='email'>Email address*</FormLabel>
          <Field name='email' type='email' className='form-control' />
          <ErrorMessage component='div' className='error' name='email' />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password'>Password*</FormLabel>
          <Field name='password' type='password' className='form-control' />
          <ErrorMessage component='div' className='error' name='password' />
        </FormGroup>
        <Button type='submit' variant='primary' className='d-block w-100'>
          Sign In
        </Button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
