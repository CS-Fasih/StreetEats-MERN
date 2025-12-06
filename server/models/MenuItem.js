import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Tacos', 'Gorditas', 'Sopes', 'Drinks', 'Specials'],
      message: '{VALUE} is not a valid category'
    }
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
menuItemSchema.index({ category: 1, isAvailable: 1 });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
