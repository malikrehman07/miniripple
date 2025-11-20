import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300); // Match the transition duration
  };

  const getNotificationConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgColor: 'bg-white',
          borderColor: 'border-green-200',
          progressColor: 'bg-green-500'
        };
      case 'error':
        return {
          icon: XCircle,
          iconColor: 'text-red-500',
          bgColor: 'bg-white',
          borderColor: 'border-red-200',
          progressColor: 'bg-red-500'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-yellow-500',
          bgColor: 'bg-white',
          borderColor: 'border-yellow-200',
          progressColor: 'bg-yellow-500'
        };
      case 'info':
        return {
          icon: Info,
          iconColor: 'text-blue-500',
          bgColor: 'bg-white',
          borderColor: 'border-blue-200',
          progressColor: 'bg-blue-500'
        };
      default:
        return {
          icon: Info,
          iconColor: 'text-gray-500',
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          progressColor: 'bg-gray-500'
        };
    }
  };

  const config = getNotificationConfig(notification.type);
  const Icon = config.icon;

  return (
    <div
      className={`
        relative min-w-80 max-w-md pointer-events-auto
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div
        className={`
          ${config.bgColor} ${config.borderColor}
          border-l-4 rounded-lg shadow-lg p-4
          backdrop-blur-sm bg-white/95
        `}
      >
        <div className="flex items-start gap-3">
          <Icon className={`${config.iconColor} h-5 w-5 mt-0.5 flex-shrink-0`} />
          
          <div className="flex-1 min-w-0">
            {notification.title && (
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {typeof notification.title === 'string' ? notification.title : String(notification.title)}
              </p>
            )}
            <p className="text-sm text-gray-700 leading-relaxed">
              {typeof notification.message === 'string' ? notification.message : String(notification.message)}
            </p>
            
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className={`
                  mt-2 text-xs font-medium px-3 py-1 rounded-md
                  ${config.iconColor.replace('text-', 'text-')} 
                  ${config.iconColor.replace('text-', 'bg-').replace('-500', '-50')}
                  hover:${config.iconColor.replace('text-', 'bg-').replace('-500', '-100')}
                  transition-colors duration-200
                `}
              >
                {notification.action.label}
              </button>
            )}
          </div>

          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar for auto-dismiss */}
        {notification.duration > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-lg overflow-hidden">
            <div 
              className={`h-full ${config.progressColor} transition-all duration-75 ease-linear`}
              style={{
                animation: `shrink ${notification.duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `
      }} />
    </div>
  );
};

export default NotificationItem;
