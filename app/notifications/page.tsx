import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';
import React from 'react';

/**
 * to do Route redirect if user not loggedIn in middleware!
 * @returns
 */
const NotificationsPage = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsPage;
