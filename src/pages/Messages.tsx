import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, Check, CheckCheck, MoreVertical, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isToday, isYesterday } from "date-fns";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
    online?: boolean;
  };
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
  replyTo?: string;
  attachments?: File[];
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
    online?: boolean;
    lastMessage?: string;
    timestamp?: Date;
    unread?: number;
  };
}

const conversations: Conversation[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Sarah Johnson",
      initials: "SJ",
      online: true,
      lastMessage: "Can you help me with the analytics assignment?",
      timestamp: new Date(),
      unread: 3,
    },
  },
  // Add other conversations here...
];

const initialMessages: Message[] = [
  {
    id: "m1",
    content: "Hi there! I need some help with the business analytics course.",
    timestamp: new Date(),
    sender: {
      id: "u1",
      name: "Sarah Johnson",
      initials: "SJ",
      online: true,
    },
    isOwn: false,
  },
  // Add other messages here...
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(
    conversations.length > 0 ? conversations[0] : null
  );
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    if (!activeConversation) return;

    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      content: newMessage,
      timestamp: new Date(),
      sender: {
        id: "admin",
        name: "Admin User",
        initials: "AU",
      },
      isOwn: true,
      status: 'read',
      replyTo: replyingTo?.id,
      attachments: [...attachments]
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachments([]);
    setReplyingTo(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    if (isToday(date)) return format(date, 'HH:mm');
    if (isYesterday(date)) return 'Yesterday ' + format(date, 'HH:mm');
    return format(date, 'dd MMM HH:mm');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-academize-orange to-purple-600 bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-gray-500">Communicate with your students</p>
      </div>

      <Card className="flex h-[calc(100vh-220px)]">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 bg-gray-50 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-8 bg-white"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors
                    ${activeConversation?.id === conversation.id 
                      ? "bg-academize-orange/10 border-l-4 border-academize-orange" 
                      : "hover:bg-gray-50"}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} />
                      <AvatarFallback className="bg-academize-orange text-white">
                        {conversation.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.user.online && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-medium text-sm truncate">
                        {conversation.user.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {conversation.user.timestamp && formatTimestamp(conversation.user.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.user.lastMessage}
                    </p>
                  </div>
                  {conversation.user.unread && (
                    <div className="h-5 w-5 rounded-full bg-academize-orange flex items-center justify-center text-white text-xs">
                      {conversation.user.unread}
                    </div>
                  )}
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        {activeConversation ? (
          <div className="w-2/3 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation.user.avatar} />
                  <AvatarFallback className="bg-academize-orange text-white">
                    {activeConversation.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${activeConversation.user.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <p className="text-xs text-gray-500">
                      {activeConversation.user.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              {isTyping && (
                <div className="text-sm text-gray-500 italic">
                  Typing...
                </div>
              )}
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] flex gap-2 ${message.isOwn ? "flex-row-reverse" : ""}`}>
                      {!message.isOwn && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="bg-academize-orange text-white text-xs">
                            {message.sender.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-1">
                        {message.replyTo && (
                          <div className="text-xs p-2 bg-gray-100 rounded-t-lg border-l-2 border-academize-orange">
                            Replying to: {messages.find(m => m.id === message.replyTo)?.content}
                          </div>
                        )}
                        <div
                          className={`relative rounded-lg p-3 ${
                            message.isOwn
                              ? "bg-academize-orange text-white rounded-br-sm"
                              : "bg-white border rounded-bl-sm"
                          }`}
                        >
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40 p-1">
                              <button
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                onClick={() => setReplyingTo(message)}
                              >
                                Reply
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                                Forward
                              </button>
                            </PopoverContent>
                          </Popover>
                          
                          <p className="text-sm pr-6">{message.content}</p>
                          <div className="flex items-center justify-end gap-2 mt-1">
                            <span className={`text-xs ${message.isOwn ? "text-orange-100" : "text-gray-500"}`}>
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {message.isOwn && (
                              <span className="text-xs">
                                {message.status === 'read' ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : message.status === 'delivered' ? (
                                  <CheckCheck className="h-3 w-3 text-gray-400" />
                                ) : (
                                  <Check className="h-3 w-3 text-gray-400" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              {replyingTo && (
                <div className="mb-2 p-2 bg-gray-50 rounded-lg border-l-4 border-academize-orange flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Replying to {replyingTo.sender.name}</p>
                    <p className="text-sm line-clamp-1">{replyingTo.content}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6"
                    onClick={() => setReplyingTo(null)}
                  >
                    ×
                  </Button>
                </div>
              )}
              {attachments.length > 0 && (
                <div className="mb-2 flex gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="text-xs p-2 bg-gray-100 rounded-lg flex items-center gap-2">
                      <Paperclip className="h-3 w-3" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="icon" asChild>
                    <div>
                      <Paperclip className="h-4 w-4" />
                    </div>
                  </Button>
                </label>
                <Button variant="outline" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 py-2 h-auto min-h-[40px]"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-academize-orange hover:bg-academize-orange/90 gap-1"
                  disabled={!newMessage.trim() && attachments.length === 0}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Messages;