import Header from "./components/Header";
import Chatbot from "./components/chatbot";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <Chatbot />
      </main>
    </div>
  );
}
