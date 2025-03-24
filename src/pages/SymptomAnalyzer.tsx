import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const SymptomAnalyzer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content:
        'Welcome to the Symptom Analyzer. Please describe your symptoms in detail. Include your age, gender, and any relevant medical history to receive a better analysis.',
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) {
      toast.error('Please enter your symptoms first');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    analyzeSymptoms(userMessage.content);
  };

  const analyzeSymptoms = async (userInput: string) => {
    if (!userInput.trim()) return;
  
    setIsAnalyzing(true);
  
    try {
      const previousMessages = messages
        .filter((msg) => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));
  
      const response = await fetch('/api/symptom-analyze', { // Relative URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          previousMessages,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }
  
      const data = await response.json();
      const assistantResponse = data.content;
  
      const botMessage: Message = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
  
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error while analyzing your symptoms. Please try again later.",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addSampleSymptom = (symptom: string) => {
    setUserInput((prev) => {
      if (prev.trim()) {
        return `${prev}, ${symptom}`;
      }
      return symptom;
    });
  };

  const sampleSymptoms = [
    'Headache',
    'Fever',
    'Cough',
    'Fatigue',
    'Sore throat',
    'Nasal congestion',
    'Chest pain',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Symptom Analyzer</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="bg-white rounded-lg mb-6 max-h-[500px] overflow-y-auto p-4 border" style={{ scrollBehavior: 'smooth' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-100 ml-auto max-w-[80%] text-right'
                        : message.role === 'system'
                        ? 'bg-gray-100 max-w-full'
                        : 'bg-[#0057FF] text-white max-w-[80%]'
                    }`}
                  >
                    <div className="font-semibold mb-1">
                      {message.role === 'user' ? 'You' : message.role === 'system' ? 'System' : 'HealthAI'}
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Common symptoms (click to add):</div>
                <div className="flex flex-wrap gap-2">
                  {sampleSymptoms.map((symptom, index) => (
                    <span
                      key={index}
                      onClick={() => addSampleSymptom(symptom)}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your symptoms in detail..."
                  className="flex-grow p-2 border rounded-md resize-none"
                  rows={3}
                  disabled={isAnalyzing}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isAnalyzing || !userInput.trim()}
                  className={`self-end px-4 py-2 rounded-md ${
                    isAnalyzing || !userInput.trim()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#0057FF] text-white hover:bg-[#0046CC]'
                  } transition-colors`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
              {isAnalyzing && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0057FF]"></div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <button
                className="px-4 py-3 w-full text-left font-medium flex items-center"
                onClick={(e) => {
                  const target = e.currentTarget.nextElementSibling;
                  if (target) {
                    target.classList.toggle('hidden');
                  }
                }}
              >
                <span>Important Information</span>
              </button>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      This tool is for informational purposes only and does not provide medical advice, diagnosis, or
                      treatment.
                    </p>
                    <p className="text-sm text-gray-700 font-semibold">
                      Always consult with a qualified healthcare provider for medical concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="px-4 py-3 w-full text-left font-medium border-t flex items-center"
                onClick={(e) => {
                  const target = e.currentTarget.nextElementSibling;
                  if (target) {
                    target.classList.toggle('hidden');
                  }
                }}
              >
                <span>How to Use</span>
              </button>
              <div className="p-4 hidden">
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Describe your symptoms in detail</li>
                  <li>Include your age, gender, and relevant medical history</li>
                  <li>Mention when symptoms started and their severity</li>
                  <li>Add any medications you're currently taking</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SymptomAnalyzer;