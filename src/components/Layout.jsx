import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">

      {/* Sticky Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 z-50 sticky top-0 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">UIbuilder</div>
          <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
            {/* <a href="#" className="hover:text-purple-600">Home</a>
            <a href="#" className="hover:text-purple-600">Templates</a>
            <a href="#" className="hover:text-purple-600">Docs</a> */}
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Grid Layout */}
      <div className="flex flex-col md:grid md:grid-cols-12 flex-1">
        
        {/* Sidebar */}
        <aside className="md:col-span-2 w-full bg-white border-r shadow-sm overflow-y-auto p-4">
          {children[0]}
        </aside>

        {/* Builder Area */}
        <main className="md:col-span-6 w-full bg-gray-100 p-4 overflow-y-auto h-[50vh] md:h-[calc(100vh-4rem)]">
          {children[1]}
        </main>

        {/* Live Preview */}
        <aside className="md:col-span-4 w-full bg-gray-50 border-l p-4 overflow-y-auto h-[50vh] md:h-[calc(100vh-4rem)]">
          {children[2]}
        </aside>
      </div>
    </div>
  );
};

export default Layout;
