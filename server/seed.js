import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';
import seedMenuItems from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing menu items');

    // Insert seed data
    await MenuItem.insertMany(seedMenuItems);
    console.log('✅ Seed data inserted successfully');
    console.log(`📊 Total items: ${seedMenuItems.length}`);

    // Display summary
    const categories = await MenuItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n📋 Menu Summary:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} items`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
