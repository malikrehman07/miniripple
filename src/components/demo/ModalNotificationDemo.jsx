import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';

const ModalNotificationDemo = () => {
  const { notify } = useNotifications();

  const showDomainSuccess = () => {
    notify.modal.domainSuccess('example.com');
  };

  const showDomainChanged = () => {
    notify.modal.domainChanged('newdomain.com');
  };

  const showLoginError = () => {
    notify.modal.loginError();
  };

  const showConfirmAction = () => {
    notify.modal.confirmAction(
      'Delete Property',
      'Are you sure you want to delete this property? This action cannot be undone.',
      () => {
        console.log('Property deleted');
        notify.success('Property deleted successfully');
      },
      () => {
        console.log('Delete cancelled');
      }
    );
  };

  const showCustomModal = () => {
    notify.modal.withActions(
      'info',
      'Connect Your Domain',
      'Select your preferred option to connect your domain to MiniRipple.',
      [
        {
          label: 'Connect using Google Analytics',
          variant: 'primary',
          onClick: () => {
            console.log('Google Analytics selected');
            notify.success('Connecting via Google Analytics...');
          }
        },
        {
          label: 'Manual Integration',
          variant: 'secondary',
          onClick: () => {
            console.log('Manual integration selected');
            notify.info('Manual integration guide opened');
          }
        }
      ]
    );
  };

  const showSecurityAlert = () => {
    notify.modal.security(
      'Security Alert',
      'Suspicious activity detected on your account. Please review your recent login activity.',
      [
        {
          label: 'Review Activity',
          variant: 'primary',
          onClick: () => {
            console.log('Reviewing activity');
          }
        },
        {
          label: 'Dismiss',
          variant: 'secondary',
          onClick: () => {
            console.log('Alert dismissed');
          }
        }
      ]
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modal Notification Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={showDomainSuccess}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Domain Connected Successfully
        </button>

        <button
          onClick={showDomainChanged}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Domain Successfully Changed
        </button>

        <button
          onClick={showLoginError}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Login Error Modal
        </button>

        <button
          onClick={showConfirmAction}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Confirm Action Modal
        </button>

        <button
          onClick={showCustomModal}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Domain Connection Options
        </button>

        <button
          onClick={showSecurityAlert}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Security Alert Modal
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Usage Examples:</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Domain Success:</strong> notify.modal.domainSuccess('domain.com')</p>
          <p><strong>Domain Changed:</strong> notify.modal.domainChanged('newdomain.com')</p>
          <p><strong>Login Error:</strong> notify.modal.loginError()</p>
          <p><strong>Confirm Action:</strong> notify.modal.confirmAction(title, message, onConfirm, onCancel)</p>
          <p><strong>Custom Modal:</strong> notify.modal.withActions(type, title, message, actions)</p>
          <p><strong>Security Alert:</strong> notify.modal.security(title, message, actions)</p>
        </div>
      </div>
    </div>
  );
};

export default ModalNotificationDemo;
