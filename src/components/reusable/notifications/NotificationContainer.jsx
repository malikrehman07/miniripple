import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationContainer = ({ notifications, onRemove }) => {
  // Only show toast notifications (filter out modal notifications)
  const toastNotifications = notifications.filter(notification => notification.displayType !== 'modal');
  
  if (toastNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {toastNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
