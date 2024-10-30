'use client';

import { createContext, use, useEffect, useState } from 'react';
import { getUserById } from '@/helpers/data';
const ChatContext = createContext(undefined);
export const useChatContext = () => {
  const context = use(ChatContext);
  if (!context) {
    throw new Error('useChatContext can only be used within ChatProvider');
  }
  return context;
};
export const ChatProvider = ({
  children
}) => {
  const [activeChat, setActiveChat] = useState();
  const [offcanvasStates, setOffcanvasStates] = useState({
    showChatList: false,
    showMessageToast: false
  });
  const changeActiveChat = async userId => {
    const user = await getUserById(userId);
    if (user) setActiveChat(user);
  };
  const toggleChatList = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showChatList: !offcanvasStates.showChatList
    });
  };
  const toggleMessageToast = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMessageToast: !offcanvasStates.showMessageToast
    });
  };
  const chatList = {
    open: offcanvasStates.showChatList,
    toggle: toggleChatList
  };
  const chatToast = {
    open: offcanvasStates.showMessageToast,
    toggle: toggleMessageToast
  };
  useEffect(() => {
    changeActiveChat('102');
  }, []);
  return <ChatContext.Provider value={{
    activeChat,
    changeActiveChat,
    chatList,
    chatToast
  }}>
      {children}
    </ChatContext.Provider>;
};