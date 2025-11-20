// src/redux/actions/userProfileActions.js
import { 
  fetchUserProfile, 
  uploadProfilePicture, 
  updateUserProfile, 
  fetchUserDataByEmail,
  setEditMode,
  setPreviewImage,
  setDragActive,
  clearPreviewImage,
  updateProfileField,
  removeProfilePicture,
  clearError,
  clearUserProfileState
} from '../slices/userProfileSlice';

// Profile data actions
export const loadUserProfile = () => async (dispatch) => {
  try {
    const result = await dispatch(fetchUserProfile()).unwrap();
    
    // Optionally fetch additional user data by email
    if (result.email) {
      dispatch(fetchUserDataByEmail(result.email));
    }
    
    return result;
  } catch (error) {
    console.error('Failed to load user profile:', error);
    throw error;
  }
};

export const uploadProfileImage = (file, onSuccess) => async (dispatch) => {
  try {
    const result = await dispatch(uploadProfilePicture(file)).unwrap();
    
    // Call success callback if provided (for syncing with AuthContext)
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(result);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    throw error;
  }
};

export const saveUserProfile = (profileData) => async (dispatch) => {
  try {
    const result = await dispatch(updateUserProfile(profileData)).unwrap();
    return result;
  } catch (error) {
    console.error('Failed to save user profile:', error);
    throw error;
  }
};

// UI state actions
export const toggleEditMode = (editMode) => (dispatch) => {
  dispatch(setEditMode(editMode));
};

export const setImagePreview = (previewUrl) => (dispatch) => {
  dispatch(setPreviewImage(previewUrl));
};

export const setDragState = (isActive) => (dispatch) => {
  dispatch(setDragActive(isActive));
};

export const clearImagePreview = () => (dispatch) => {
  dispatch(clearPreviewImage());
};

export const updateField = (field, value) => (dispatch) => {
  dispatch(updateProfileField({ field, value }));
};

export const removeImage = () => (dispatch) => {
  dispatch(removeProfilePicture());
};

export const clearProfileError = () => (dispatch) => {
  dispatch(clearError());
};

export const resetUserProfile = () => (dispatch) => {
  dispatch(clearUserProfileState());
};

// File handling actions
export const handleFileSelect = (file) => async (dispatch) => {
  try {
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(setImagePreview(e.target.result));
    };
    reader.readAsDataURL(file);
    
    // Upload the file
    await dispatch(uploadProfileImage(file));
  } catch (error) {
    console.error('File handling error:', error);
    throw error;
  }
};

export const handleDragDrop = (files) => async (dispatch) => {
  try {
    if (files && files[0]) {
      const file = files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setImagePreview(e.target.result));
      };
      reader.readAsDataURL(file);
      
      // Upload the file
      await dispatch(uploadProfileImage(file));
    }
  } catch (error) {
    console.error('Drag and drop error:', error);
    throw error;
  }
};

// Export all actions
export {
  fetchUserProfile,
  uploadProfilePicture,
  updateUserProfile,
  fetchUserDataByEmail,
  setEditMode,
  setPreviewImage,
  setDragActive,
  clearPreviewImage,
  updateProfileField,
  removeProfilePicture,
  clearError,
  clearUserProfileState
};
