
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
        <header className="flex h-12 shrink-0 items-center gap-2 px-4 border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
          <SidebarTrigger className="text-white" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white">PlanMaster Pro</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
