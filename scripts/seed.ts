import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/User.model';
import Project from '../src/models/Project.model';
import Skill from '../src/models/Skill.model';
import Experience from '../src/models/Experience.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const sampleData = {
  users: [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'Full-stack developer with 5+ years of experience',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      socialLinks: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
      }
    }
  ],
  skills: [
    {
      name: 'JavaScript',
      category: 'frontend',
      proficiency: 90,
      description: 'Advanced JavaScript with ES6+ features',
      yearsOfExperience: 5,
      featured: true
    },
    {
      name: 'React',
      category: 'frontend',
      proficiency: 85,
      description: 'React with hooks and modern patterns',
      yearsOfExperience: 4,
      featured: true
    },
    {
      name: 'Node.js',
      category: 'backend',
      proficiency: 80,
      description: 'Server-side JavaScript development',
      yearsOfExperience: 4,
      featured: true
    },
    {
      name: 'MongoDB',
      category: 'database',
      proficiency: 75,
      description: 'NoSQL database design and optimization',
      yearsOfExperience: 3,
      featured: false
    },
    {
      name: 'TypeScript',
      category: 'tools',
      proficiency: 70,
      description: 'Type-safe JavaScript development',
      yearsOfExperience: 2,
      featured: true
    }
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
      shortDescription: 'Modern e-commerce platform with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      images: ['https://via.placeholder.com/800x600/007bff/ffffff?text=E-commerce+Platform'],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/johndoe/ecommerce-platform',
      featured: true,
      status: 'active',
      category: 'web-application',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-01')
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
      shortDescription: 'Team collaboration and task management app',
      technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
      images: ['https://via.placeholder.com/800x600/28a745/ffffff?text=Task+Management+App'],
      liveUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/johndoe/task-manager',
      featured: true,
      status: 'active',
      category: 'web-application',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-12-01')
    }
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: new Date('2022-01-01'),
      current: true,
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      responsibilities: [
        'Architect and develop high-performance web applications',
        'Mentor junior developers and conduct code reviews',
        'Collaborate with product managers and designers',
        'Implement best practices and coding standards'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      achievements: [
        'Reduced application load time by 40%',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Led team of 5 developers on major project'
      ],
      type: 'full-time'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      description: 'Developed and maintained multiple web applications for startup clients.',
      responsibilities: [
        'Built responsive web applications from scratch',
        'Integrated third-party APIs and services',
        'Optimized database queries and performance',
        'Deployed applications to cloud platforms'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Heroku'],
      achievements: [
        'Delivered 10+ client projects on time',
        'Improved application performance by 30%',
        'Received client satisfaction score of 95%'
      ],
      type: 'full-time'
    }
  ]
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Seed users
    const hashedPassword = await bcrypt.hash('password123', 12);
    const users = await User.create(
      sampleData.users.map(user => ({ ...user, password: hashedPassword }))
    );
    console.log(`👥 Created ${users.length} users`);
    
    // Seed skills
    const skills = await Skill.create(sampleData.skills);
    console.log(`🛠️ Created ${skills.length} skills`);
    
    // Seed projects
    const projects = await Project.create(sampleData.projects);
    console.log(`📁 Created ${projects.length} projects`);
    
    // Seed experience
    const experience = await Experience.create(sampleData.experience);
    console.log(`💼 Created ${experience.length} experience entries`);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Skills: ${skills.length}`);
    console.log(`   Projects: ${projects.length}`);
    console.log(`   Experience: ${experience.length}`);
    console.log('\n🔑 Default Login Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
