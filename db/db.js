import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://thTs0ustas:LHcXjFW2wYsbgVx@cluster0.zborg.mongodb.net/test'
    );
  } catch (e) {
    console.log(e);
  }
}

const contactSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  message: String,
  email: String,
});
const Contacts =
  mongoose.models?.Contacts || mongoose.model('Contacts', contactSchema);

export { main, Contacts };
