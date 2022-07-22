import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.zborg.mongodb.net/${process.env.mongodb_db}`
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
