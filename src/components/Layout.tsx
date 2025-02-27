// components/Layout.tsx
import Sidebar from '../components/sideBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isRegistered = typeof window !== "undefined" ? localStorage.getItem("isRegistered") : null;

  return (
    <div className="flex">
      {isRegistered && <Sidebar />}
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
};
export default Layout;



// import Link from 'next/link';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// export default function Layout({ children }) {
//   const { user, logout } = useContext(AuthContext);
  
//   return (
//     <div className="container mx-auto px-4">
//       <header className="flex justify-between items-center py-4">
//         <Link href="/">
//           <a className="text-xl font-bold">Your App</a>
//         </Link>
//         <nav>
//           <ul className="flex space-x-4">
//             <li>
//               <Link href="/">
//                 <a className="hover:underline">Home</a>
//               </Link>
//             </li>
//             {user ? (
//               <>
//                 <li>
//                   <Link href="/dashboard">
//                     <a className="hover:underline">Dashboard</a>
//                   </Link>
//                 </li>
//                 <li>
//                   <button onClick={logout} className="hover:underline">
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link href="/login">
//                     <a className="hover:underline">Login</a>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/register">
//                     <a className="hover:underline">Register</a>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </header>
//       <main className="py-4">{children}</main>
//     </div>
//   );
// }