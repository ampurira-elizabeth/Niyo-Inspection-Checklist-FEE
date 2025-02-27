// components/Sidebar.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";



const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isRegistered");
    router.push("/auth/login");
};

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link href="/inspections/inspectionform">
            <button className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Add Inspections Form
            </button>
          </Link>
        </li>
        <li>
          <Link href="/inspections">
            <button className="block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Inspections List
            </button>
          </Link>
        </li>
        <li>
          <Link href="/inspections">
            <button className="block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Specialist
            </button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <button className="block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Settings
            </button>
          </Link>
        </li>

        <li>
          {/* <Link href="#"> */}
            <button onClick={handleLogout} className="block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Logout
            </button>
          {/* </Link> */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
