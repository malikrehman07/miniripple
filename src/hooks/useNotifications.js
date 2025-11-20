import { useNotification } from '../components/reusable/notifications/NotificationContext';

export const useNotifications = () => {
  const { success, error, warning, info, addNotification, removeNotification, clearAll } = useNotification();

  // Enhanced notification methods with common use cases
  const notify = {
    // Toast notifications (existing)
    success: (message, options) => success(message, options),
    loginSuccess: () => addNotification({
      type: 'success',
      displayType: 'modal',
      title: 'Login Successful',
      message: 'Welcome back! You have been logged in successfully.',
      duration: 0
    }),
    logoutSuccess: () => addNotification({
      type: 'success',
      displayType: 'modal',
      title: 'Logged Out',
      message: 'You have been logged out successfully.',
      duration: 0
    }),
    saveSuccess: (item = 'Changes') => addNotification({
      type: 'success',
      displayType: 'modal',
      title: 'Saved Successfully',
      message: `${item} saved successfully!`,
      duration: 0
    }),
    deleteSuccess: (item = 'Item') => addNotification({
      type: 'success',
      displayType: 'modal',
      title: 'Deleted Successfully',
      message: `${item} deleted successfully!`,
      duration: 0
    }),
    copySuccess: () => success('Copied to clipboard!'), // Keep as toast for quick feedback

    // Error notifications  
    error: (message, options) => error(message, options),
    loginError: () => addNotification({
      type: 'error',
      displayType: 'modal',
      title: 'Login Failed',
      message: 'Invalid email or password. Please check your credentials and try again.',
      duration: 0
    }),
    networkError: () => addNotification({
      type: 'error',
      displayType: 'modal',
      title: 'Network Error',
      message: 'Network error. Please check your connection and try again.',
      duration: 0
    }),
    validationError: (field) => addNotification({
      type: 'error',
      displayType: 'modal',
      title: 'Validation Error',
      message: `Please check the ${field} field and try again.`,
      duration: 0
    }),
    permissionError: () => addNotification({
      type: 'error',
      displayType: 'modal',
      title: 'Permission Denied',
      message: 'You do not have permission to perform this action.',
      duration: 0
    }),
    genericError: () => addNotification({
      type: 'error',
      displayType: 'modal',
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      duration: 0
    }),

    // Warning notifications
    warning: (message, options) => warning(message, options),
    unsavedChanges: () => warning('You have unsaved changes. Are you sure you want to leave?'),
    sessionExpiring: () => warning('Your session will expire soon. Please save your work.'),
    quotaWarning: (percentage) => warning(`You have used ${percentage}% of your quota.`),

    // Info notifications
    info: (message, options) => info(message, options),
    processing: () => info('Processing your request...', { duration: 0 }), // Persistent until manually removed
    updateAvailable: () => info('A new version is available. Refresh to update.'),
    maintenanceMode: () => info('Scheduled maintenance will begin in 30 minutes.'),

    // Modal notifications (new)
    modal: {
      success: (title, message, actions = null) => addNotification({
        type: 'success',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0 // Modal notifications don't auto-dismiss by default
      }),

      error: (title, message, actions = null) => addNotification({
        type: 'error',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      }),

      warning: (title, message, actions = null) => addNotification({
        type: 'warning',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      }),

      info: (title, message, actions = null) => addNotification({
        type: 'info',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      }),

      domain: (title, message, actions = null) => addNotification({
        type: 'domain',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      }),

      security: (title, message, actions = null) => addNotification({
        type: 'security',
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      }),

      // Common modal scenarios
      domainSuccess: (domain) => addNotification({
        type: 'domain',
        displayType: 'modal',
        title: 'Domain Connected Successfully',
        message: `Your domain "${domain}" has been connected and is now ready to track visitors.`,
        duration: 0
      }),

      domainChanged: (domain) => addNotification({
        type: 'success',
        displayType: 'modal',
        title: 'Domain Successfully Changed',
        message: `Your domain has been updated to "${domain}" successfully.`,
        duration: 0
      }),

      loginError: () => addNotification({
        type: 'error',
        displayType: 'modal',
        title: 'Login Failed',
        message: 'Invalid email or password. Please check your credentials and try again.',
        duration: 0
      }),

      confirmAction: (title, message, onConfirm, onCancel = null) => addNotification({
        type: 'warning',
        displayType: 'modal',
        title,
        message,
        actions: [
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: onCancel || (() => {}),
            closeOnClick: true
          },
          {
            label: 'Confirm',
            variant: 'primary',
            onClick: onConfirm,
            closeOnClick: true
          }
        ],
        duration: 0
      }),

      withActions: (type, title, message, actions) => addNotification({
        type,
        displayType: 'modal',
        title,
        message,
        actions,
        duration: 0
      })
    },

    // Custom notifications with actions (toast)
    withAction: (type, message, actionLabel, actionCallback, options = {}) => {
      return addNotification({
        type,
        message,
        action: {
          label: actionLabel,
          onClick: actionCallback
        },
        ...options
      });
    },

    // Persistent notifications (require manual dismiss)
    persistent: (type, message, options = {}) => {
      return addNotification({
        type,
        message,
        duration: 0, // Won't auto-dismiss
        ...options
      });
    }
  };

  return {
    notify,
    removeNotification,
    clearAll
  };
};

export default useNotifications;
