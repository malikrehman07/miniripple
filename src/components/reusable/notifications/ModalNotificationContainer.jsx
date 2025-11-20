import React from 'react';
import ModalNotificationItem from './ModalNotificationItem';

const ModalNotificationContainer = ({ notifications, onRemove }) => {
  // Only show modal notifications (filter out toast notifications)
  const modalNotifications = notifications.filter(notification => notification.displayType === 'modal');

  if (modalNotifications.length === 0) {
    return null;
  }

  // Only show the most recent modal notification to avoid multiple overlays
  const currentNotification = modalNotifications[modalNotifications.length - 1];

  return (
    <ModalNotificationItem
      key={currentNotification.id}
      notification={currentNotification}
      onRemove={onRemove}
    />
  );
};

export default ModalNotificationContainer;
