// components/Layout.tsx
import Sidebar from '../components/sideBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;
