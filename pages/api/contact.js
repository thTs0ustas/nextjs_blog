import { Contacts, main } from '../../db/db';

async function handleContact(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    const validMail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ).test(email);

    if (!validMail) {
      return res.status(400).json({
        message: 'Invalid email address',
      });
    }
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        message: 'Message is required',
      });
    }
    const newMessage = {
      email,
      name,
      message,
    };
    try {
      await main();
      await Contacts.create(newMessage);
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    }

    return res.status(201).json({ message: 'Message sent' });
  }
}

export default handleContact;
