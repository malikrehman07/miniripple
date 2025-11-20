import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info, Shield, Globe, Star } from 'lucide-react';

// Star Badge with Checkmark Icon Component (using custom Vector.svg)
const StarCheckIcon = ({ className }) => (
  <div className={`${className} flex items-center justify-center`}>
    {/* Use the custom Vector.svg icon */}
    <img 
      src="/Vector.svg" 
      alt="Success" 
      className="w-full h-full object-contain"
    />
  </div>
);

const ModalNotificationItem = ({ notification, onRemove }) => {
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
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleRemove();
    }
  };

  const getNotificationConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: StarCheckIcon,
          iconColor: 'text-green-500',
          iconBgColor: 'bg-green-50',
          bgColor: 'bg-white',
          borderColor: 'border-green-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      case 'error':
        return {
          icon: XCircle,
          iconColor: 'text-red-500',
          iconBgColor: 'bg-red-100',
          bgColor: 'bg-white',
          borderColor: 'border-red-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-yellow-500',
          iconBgColor: 'bg-yellow-100',
          bgColor: 'bg-white',
          borderColor: 'border-yellow-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      case 'info':
        return {
          icon: Info,
          iconColor: 'text-blue-500',
          iconBgColor: 'bg-blue-100',
          bgColor: 'bg-white',
          borderColor: 'border-blue-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      case 'domain':
        return {
          icon: StarCheckIcon,
          iconColor: 'text-green-500',
          iconBgColor: 'bg-green-50',
          bgColor: 'bg-white',
          borderColor: 'border-green-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      case 'security':
        return {
          icon: Shield,
          iconColor: 'text-blue-500',
          iconBgColor: 'bg-blue-100',
          bgColor: 'bg-white',
          borderColor: 'border-blue-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
      default:
        return {
          icon: Info,
          iconColor: 'text-gray-500',
          iconBgColor: 'bg-gray-100',
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-600'
        };
    }
  };

  const config = getNotificationConfig(notification.type);
  const Icon = config.icon;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black bg-opacity-50 backdrop-blur-sm
        transition-all duration-300 ease-out
        ${isVisible && !isLeaving 
          ? 'opacity-100' 
          : 'opacity-0'
        }
      `}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative w-full max-w-sm mx-auto
          transform transition-all duration-300 ease-out
          ${isVisible && !isLeaving 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-95'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Close button in top-right corner */}
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="px-8 py-10 text-center">
            {/* Large Icon */}
            <div className="mb-4 flex justify-center">
              {Icon === StarCheckIcon ? (
                <Icon className="h-16 w-16" />
              ) : (
                <Icon className={`${config.iconColor} h-16 w-16`} />
              )}
            </div>

            {/* Title */}
            {notification.title && (
              <h3 className="text-2xl font-medium text-gray-900 mb-3">
                {typeof notification.title === 'string' ? notification.title : String(notification.title)}
              </h3>
            )}

            {/* Message */}
            {notification.message && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {typeof notification.message === 'string' ? notification.message : String(notification.message)}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {notification.actions && notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.onClick();
                    if (action.closeOnClick !== false) {
                      handleRemove();
                    }
                  }}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${action.variant === 'primary' 
                      ? `${config.iconColor.replace('text-', 'bg-')} text-white hover:${config.iconColor.replace('text-', 'bg-').replace('-500', '-600')}` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {action.label}
                </button>
              ))}
              
              {!notification.actions && (
                <button
                  onClick={handleRemove}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${config.iconColor.replace('text-', 'bg-')} text-white hover:${config.iconColor.replace('text-', 'bg-').replace('-500', '-600')}
                  `}
                >
                  OK
                </button>
              )}
            </div>
          </div>

          {/* Progress bar for auto-dismiss */}
          {notification.duration > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
              <div 
                className={`h-full ${config.iconColor.replace('text-', 'bg-')} transition-all duration-75 ease-linear`}
                style={{
                  animation: `shrink ${notification.duration}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
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

export default ModalNotificationItem;
