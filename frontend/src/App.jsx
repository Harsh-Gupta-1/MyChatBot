import ChatApp from "./pages/ChatApp"
import Navbar from "./components/Navbar"; 
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ChatApp />
    </div>
  );
}

export default App
