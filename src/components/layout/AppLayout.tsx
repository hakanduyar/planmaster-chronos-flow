
import React from 'react';
import { Sidebar, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 px-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
          <SidebarTrigger className="text-white hover:bg-white/10 transition-colors" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            <h1 className="text-xl font-bold gradient-text">PlanMaster Pro</h1>
          </div>
        </header>
        <main className="flex-1 bg-gradient-planmaster dashboard-container">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
