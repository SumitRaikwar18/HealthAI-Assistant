
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import ChatAssistant from "./pages/ChatAssistant";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import KendoLoader from "./components/KendoLoader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <KendoLoader size="large" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
            <Route path="/chat-assistant" element={<ChatAssistant />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
