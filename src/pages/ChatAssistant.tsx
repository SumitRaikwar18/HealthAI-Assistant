import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your HealthAI Assistant. How can I help you with your health questions today?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSound, setEnableSound] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) {
      toast.error('Please type a message first');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    if (enableSound) {
      // Play sound effect when sending message (add audio file in production)
      // const audio = new Audio('/message-sent.mp3');
      // audio.play();
    }

    processMessage(userMessage.content);
  };

  const processMessage = async (userInput: string) => {
    if (!userInput.trim()) return;
  
    setIsLoading(true);
  
    try {
      const systemMessage = {
        role: 'system',
        content:
          'You are a helpful health assistant AI. Provide accurate, helpful information about health topics. Make responses conversational, concise, and informative. For serious medical concerns, always recommend consulting a healthcare professional. Do not diagnose or prescribe.',
      };
  
      const messagePayload = [
        systemMessage,
        ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: userInput },
      ];
  
      const response = await fetch('/api/chat', { // Relative URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagePayload }),
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
      console.error('Error sending message:', error);
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
  
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I had trouble processing your request. Please try again later.",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What causes headaches?',
    'How to reduce stress naturally?',
    'Is my fever concerning?',
    'What are common cold symptoms?',
  ];

  const handleSuggestedQuestion = (question: string) => {
    setUserInput(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E6F0FA]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-3xl font-bold text-center">Health Chat Assistant</h1>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Chat with our AI Health Assistant</h2>
              <p className="text-gray-600 mb-4">Ask any health-related questions to get reliable information</p>
              <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="sound-toggle" className="text-sm">Sound</label>
                  <div className="relative inline-block w-10 h-5">
                    <input
                      id="sound-toggle"
                      type="checkbox"
                      checked={enableSound}
                      onChange={() => setEnableSound(!enableSound)}
                      className="opacity-0 w-0 h-0"
                    />
                    <span
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        enableSound ? 'bg-[#0057FF]' : 'bg-gray-300'
                      }`}
                    ></span>
                    <span
                      className={`absolute h-4 w-4 bg-white rounded-full top-0.5 transition-transform ${
                        enableSound ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    ></span>
                  </div>
                  <span className="text-xs text-gray-500">{enableSound ? 'On' : 'Off'}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg mb-6 h-[400px] overflow-y-auto p-4 flex flex-col border">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-100 ml-auto max-w-[80%] text-right'
                        : 'bg-[#0057FF] text-white max-w-[80%]'
                    }`}
                  >
                    <div className="font-semibold mb-1">{message.role === 'user' ? 'You' : 'HealthAI'}</div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">You can ask questions like:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your health question here..."
                  className="flex-grow p-2 border rounded-md resize-none"
                  rows={3}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (userInput.trim()) handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className={`self-end px-4 py-2 rounded-md ${
                    isLoading || !userInput.trim()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#0057FF] text-white hover:bg-[#0046CC]'
                  } transition-colors`}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0057FF]"></div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md">
            <div className="bg-[#0057FF] text-white p-3 rounded-t-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Important Health Information</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                This is not a substitute for professional medical advice. The information provided is for informational
                purposes only.
              </p>
              <p className="text-sm text-gray-600 mt-2 font-semibold">
                Always consult with a qualified healthcare provider for medical diagnoses, treatments, and advice.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatAssistant;