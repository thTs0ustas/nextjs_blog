import { useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

function ContactForm() {
  const [state, setState] = useState({
    enteredName: '',
    enteredEmail: '',
    enteredMessage: '',
    requestStatus: null,
    requestError: null,
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (state.requestStatus === 'success' || state.requestStatus === 'error') {
      const timer = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          requestStatus: null,
          requestError: null,
        }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    setState(prevState => ({
      ...prevState,
      requestStatus: 'pending',
    }));

    try {
      await sendContactData({
        email: state.enteredEmail,
        name: state.enteredName,
        message: state.enteredMessage,
      });
      setState(prevState => ({
        ...prevState,
        requestStatus: 'success',
        enteredMessage: '',
        enteredEmail: '',
        enteredName: '',
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        requestStatus: 'error',
        requestError: error.message,
      }));
    }
  }

  let notification;

  if (state.requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (state.requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (state.requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: state.requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              name="enteredEmail"
              value={state.enteredEmail}
              onChange={handleChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              name="enteredName"
              value={state.enteredName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            name="enteredMessage"
            value={state.enteredMessage}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
