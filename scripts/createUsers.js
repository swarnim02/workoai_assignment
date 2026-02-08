const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const users = [
  { name: 'User One', email: 'user1@example.com', password: 'password123', role: 'user' },
  { name: 'User Two', email: 'user2@example.com', password: 'password123', role: 'user' },
  { name: 'User Three', email: 'user3@example.com', password: 'password123', role: 'user' },
  { name: 'User Four', email: 'user4@example.com', password: 'password123', role: 'user' },
  { name: 'User Five', email: 'user5@example.com', password: 'password123', role: 'user' }
];

async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });
      await user.save();
      console.log(`✅ Created: ${userData.name} (${userData.email})`);
    }

    console.log('\n🎉 All 5 users created successfully!');
    console.log('\nLogin credentials:');
    users.forEach((u, i) => {
      console.log(`${i + 1}. Email: ${u.email} | Password: password123`);
    });

    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️  Some users already exist in database');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

createUsers();
