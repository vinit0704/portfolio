const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const sampleProfile = {
  name: "John Doe",
  title: "Full Stack Developer & UI/UX Enthusiast",
  bio: "Passionate developer with 5+ years of experience in building scalable web applications.",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  }
};

const sampleSkills = [
  { name: "React", category: "Frontend", proficiency: 95 },
  { name: "Node.js", category: "Backend", proficiency: 90 },
  { name: "JavaScript", category: "Frontend", proficiency: 95 },
  { name: "MongoDB", category: "Database", proficiency: 85 },
  { name: "Express.js", category: "Backend", proficiency: 90 },
  { name: "Git", category: "Tools", proficiency: 90 }
];

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with user authentication and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/johndoe/ecommerce",
    featured: true,
    category: "Web",
    status: "Completed"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates.",
    technologies: ["React", "Firebase", "Material-UI"],
    githubUrl: "https://github.com/johndoe/taskmanager",
    featured: true,
    category: "Web",
    status: "Completed"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Project.deleteMany();

    console.log('Inserting sample data...');
    await Profile.create(sampleProfile);
    await Skill.insertMany(sampleSkills);
    await Project.insertMany(sampleProjects);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();