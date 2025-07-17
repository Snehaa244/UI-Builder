import React from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Builder from './components/Builder';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import EditorContainer from './components/EditorContainer'; // Import this

function App() {
  return (
    <Layout>
      <Sidebar />
      <div className="flex flex-col gap-4 col-span-6">
        <Builder />
        <EditorContainer /> {/*  Add EditorContainer here */}
      </div>
      <Preview />
    </Layout>
  );
}

export default App;
