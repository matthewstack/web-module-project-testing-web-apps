import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render( <ContactForm />)
});

test('renders the contact form header', ()=> {
    render( <ContactForm />)
 
    const headerText= screen.getByText(/Contact Form/i)

    expect(headerText).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render( <ContactForm />)

    const firstName = screen.getByPlaceholderText(/edd/i) 
    userEvent.type(firstName, "matt");

    const firstNameError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const button = screen.getByRole(/button/i);
    userEvent.click(button);

    const firstNameError = await screen.findByText(/firstName must have at least 5 characters/i)
    const lastNameError = await screen.findByText(/lastName is a required field/i)
    const emailError = await screen.findByText(/email must be a valid email address/i)

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render( <ContactForm />)

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, "George");

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, "Washington");

    const button= screen.getByRole(/button/i)
    userEvent.click(button);

    const emailError =  await screen.findByText(/Error: email must be a valid email address./i);

    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});