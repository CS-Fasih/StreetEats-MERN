import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api/menu';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useMenuStore = create((set) => ({
  menuItems: [],
  loading: false,
  error: null,
  selectedCategory: 'All',

  // Fetch all menu items
  fetchMenuItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ menuItems: response.data.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch menu items', 
        loading: false 
      });
    }
  },

  // Create new menu item (Admin only)
  createMenuItem: async (itemData) => {
    try {
      const response = await axios.post(API_URL, itemData, {
        headers: getAuthHeaders()
      });
      set((state) => ({
        menuItems: [...state.menuItems, response.data.data]
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create item' 
      };
    }
  },

  // Update menu item (Admin only)
  updateMenuItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, itemData, {
        headers: getAuthHeaders()
      });
      set((state) => ({
        menuItems: state.menuItems.map(item => 
          item._id === id ? response.data.data : item
        )
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update item' 
      };
    }
  },

  // Delete menu item (Admin only)
  deleteMenuItem: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
      });
      set((state) => ({
        menuItems: state.menuItems.filter(item => item._id !== id)
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete item' 
      };
    }
  },

  // Set selected category
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Get filtered items
  getFilteredItems: () => {
    const { menuItems, selectedCategory } = useMenuStore.getState();
    if (selectedCategory === 'All') return menuItems;
    return menuItems.filter(item => item.category === selectedCategory);
  }
}));

export default useMenuStore;
