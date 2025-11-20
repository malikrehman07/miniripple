import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationDemo = () => {
  const { notify } = useNotifications();

  const handleSuccessDemo = () => {
    notify.success("This is a success notification!", {
      title: "Success!",
      duration: 4000
    });
  };

  const handleErrorDemo = () => {
    notify.error("This is an error notification with a longer message to show how it handles multiple lines of text.", {
      title: "Error Occurred",
      duration: 6000
    });
  };

  const handleWarningDemo = () => {
    notify.warning("This is a warning notification!", {
      title: "Warning",
      duration: 5000
    });
  };

  const handleInfoDemo = () => {
    notify.info("This is an info notification with some useful information.", {
      title: "Information",
      duration: 4000
    });
  };

  const handleLoginErrorDemo = () => {
    notify.loginError();
  };

  const handleWithActionDemo = () => {
    notify.withAction(
      'info',
      'Your session will expire in 5 minutes. Would you like to extend it?',
      'Extend Session',
      () => {
        notify.success('Session extended successfully!');
      },
      {
        title: 'Session Expiring',
        duration: 0 // Persistent until action taken
      }
    );
  };

  const handlePersistentDemo = () => {
    notify.persistent(
      'warning',
      'This notification will stay until you manually dismiss it.',
      {
        title: 'Persistent Notification'
      }
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notification System Demo</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSuccessDemo}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Success Notification
        </button>
        
        <button
          onClick={handleErrorDemo}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Error Notification
        </button>
        
        <button
          onClick={handleWarningDemo}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Warning Notification
        </button>
        
        <button
          onClick={handleInfoDemo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Info Notification
        </button>
        
        <button
          onClick={handleLoginErrorDemo}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Login Error
        </button>
        
        <button
          onClick={handleWithActionDemo}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          With Action Button
        </button>
        
        <button
          onClick={handlePersistentDemo}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Persistent Notification
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Beautiful animations and transitions</li>
          <li>• Multiple notification types (success, error, warning, info)</li>
          <li>• Auto-dismiss with progress bar</li>
          <li>• Action buttons for interactive notifications</li>
          <li>• Persistent notifications for critical messages</li>
          <li>• Responsive design for mobile and desktop</li>
          <li>• Customizable duration and styling</li>
          <li>• Better accessibility and UX</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDemo;
