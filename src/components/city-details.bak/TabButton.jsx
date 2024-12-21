const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
    } rounded-lg`}
  >
    {children}
  </button>
);

export default TabButton;