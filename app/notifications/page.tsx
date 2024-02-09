import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import React from 'react';

/**
 * to do Route redirect if user not loggedIn in middleware!
 * @returns
 */
const NotificationsPage = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsPage;
