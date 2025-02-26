// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar: React.FC = () => {
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
            <button className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Inspections List
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
