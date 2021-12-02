import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const headerText = screen.getByText(/Contact Form/i);

  expect(headerText).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "matt");

  const firstNameError = screen.getByText(
    /Error: firstName must have at least 5 characters./i
  );
  expect(firstNameError).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const button = screen.getByRole(/button/i);
  userEvent.click(button);

  const firstNameError = await screen.findByText(
    /firstName must have at least 5 characters/i
  );
  const lastNameError = await screen.findByText(
    /lastName is a required field/i
  );
  const emailError = await screen.findByText(
    /email must be a valid email address/i
  );

  expect(firstNameError).toBeInTheDocument();
  expect(lastNameError).toBeInTheDocument();
  expect(emailError).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "Billy");

  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "Clinton");

  const button = screen.getByRole(/button/i);
  userEvent.click(button);

  const emailError = await screen.findByText(
    /Error: email must be a valid email address./i
  );

  expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const email = screen.getByLabelText(/Email/i);
  userEvent.type(email, "notanemail@");

  const emailError = await screen.findByText(
    /Error: email must be a valid email address./i
  );
  expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const button = screen.getByRole(/button/i);
  userEvent.click(button);

  const lastNameError = await screen.findByText(
    /Error: lastName is a required field./i
  );
  expect(lastNameError).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "Billy");

  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "Clinton");

  const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(email, "bill@whitehouse.gov");

  const button = screen.getByRole(/button/i);
  userEvent.click(button);

  const firstNameRender = await screen.getByTestId(/firstnameDisplay/i);
  expect(firstNameRender).toBeInTheDocument();

  const lastNameRender = await screen.getByTestId(/lastnameDisplay/i);
  expect(lastNameRender).toBeInTheDocument();

  const emailRender = await screen.getByTestId(/emailDisplay/i);
  expect(emailRender).toBeInTheDocument();

  const messageRender = await screen.queryByTestId(/messageDisplay/i);
  expect(messageRender).toBeNull();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "Billy");

  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "Clinton");

  const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(email, "bill@whitehouse.gov");

  const message = screen.getByLabelText(/Message/i);
  userEvent.type(message, "Test message");

  const button = screen.getByRole(/button/i);
  userEvent.click(button);

  const firstNameRender = await screen.getByTestId(/firstnameDisplay/i);
  expect(firstNameRender).toBeInTheDocument();

  const lastNameRender = await screen.getByTestId(/lastnameDisplay/i);
  expect(lastNameRender).toBeInTheDocument();

  const emailRender = await screen.getByTestId(/emailDisplay/i);
  expect(emailRender).toBeInTheDocument();

  const messageRender = await screen.queryByTestId(/messageDisplay/i);
  expect(messageRender).toBeInTheDocument();
});
