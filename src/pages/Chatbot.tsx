
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, Bot, User, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const mockBotResponses = [
  "I can help you manage your coffee shop inventory.",
  "Your most popular drink today is the Cappuccino.",
  "You're running low on milk. Would you like me to add it to your order list?",
  "Today's sales are 15% higher than yesterday.",
  "You have 5 new customer orders waiting to be processed.",
  "The new seasonal menu items have been very popular this week.",
  "I've analyzed your sales data and recommend increasing your stock of cold brew coffee for the upcoming summer months.",
  "Would you like me to generate a report of this week's sales data?",
  "The current temperature is 72°F. This is ideal weather for promoting your iced coffee selection.",
  "I can help you optimize your employee scheduling based on peak customer hours."
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Coffee Shop AI assistant. How can I help you manage your coffee shop today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API call to AI service
    setTimeout(() => {
      const randomResponse = mockBotResponses[Math.floor(Math.random() * mockBotResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your Coffee Shop AI assistant. How can I help you manage your coffee shop today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "Chat cleared",
      description: "All previous messages have been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Chatbot Assistant</h1>
          <p className="text-muted-foreground">
            Ask your AI assistant for help managing your coffee shop.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleClearChat}
        >
          <RefreshCw className="h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <CardHeader>
          <CardTitle>Coffee Shop AI</CardTitle>
          <CardDescription>
            Your AI-powered assistant for coffee shop management
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className={message.sender === "bot" ? "bg-coffee-100 text-coffee-800" : "bg-primary text-primary-foreground"}>
                      <AvatarFallback>
                        {message.sender === "bot" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 shadow-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="mt-4 relative">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="gap-1"
              >
                {isLoading ? 
                  <RefreshCw className="h-4 w-4 animate-spin" /> : 
                  <SendHorizonal className="h-4 w-4" />
                }
                <span className="sm:inline hidden">Send</span>
              </Button>
            </form>
            {isLoading && (
              <p className="text-xs text-muted-foreground mt-2">
                AI assistant is typing...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
