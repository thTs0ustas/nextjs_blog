import axios from 'axios';
import { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

async function sendContactData(contactDetails) {
  return await axios.post('/api/contact', JSON.stringify(contactDetails), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

    setState(prevState => ({
      ...prevState,
      requestStatus: 'pending',
    }));
    try {
      sendContactData({
        email: state.enteredEmail,
        name: state.enteredName,
        message: state.enteredMessage,
      })
        
        .catch(error => {
          setState(prevState => ({
            ...prevState,
            requestStatus: 'error',
            requestError: error.message,
          }));
        })
        .finally(() => {
          setState(prevState => ({
            ...prevState,
            requestStatus: 'success',
            enteredMessage: '',
            enteredEmail: '',
            enteredName: '',
          }));
        });
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
