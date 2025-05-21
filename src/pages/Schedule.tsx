import { useState, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Plus, 
  Video, 
  Users, 
  MapPin, 
  CalendarIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Event type definition remains the same
type Event = {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: "class" | "meeting" | "deadline" | "other";
  attendees?: number;
  isVirtual?: boolean;
  location?: string;
  description?: string;
};

// Sample events array remains the same
const events: Event[] = [
  // ... (events array stays the same)
];

const getEventColor = (type: string) => {
  // Color function remains the same
};

// Enhanced Calendar Component
const CalendarView = ({ 
  date, 
  setDate, 
  selectedDate, 
  hasEvents 
}) => {
  // Get current date
  const today = new Date();
  
  // Calculate first day of month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  
  // Calculate last day of month
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  // Calculate days from previous month to display
  const daysFromPrevMonth = firstDayOfMonth.getDay();
  
  // Calculate days from next month to display to complete the grid
  const daysFromNextMonth = 6 - lastDayOfMonth.getDay();
  
  // Get previous month's last days
  const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  
  // Create calendar days array
  const calendarDays = [];
  
  // Add days from previous month
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const day = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i);
    calendarDays.push({ date: day, isPrevMonth: true });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i);
    calendarDays.push({ date: day, isCurrentMonth: true });
  }
  
  // Add days from next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const day = new Date(date.getFullYear(), date.getMonth() + 1, i);
    calendarDays.push({ date: day, isNextMonth: true });
  }
  
  // Function to navigate to previous/next month
  const navigateMonth = (direction) => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + (direction === 'next' ? 1 : -1), 1);
    setDate(newDate);
  };
  
  // Function to check if a date is today
  const isToday = (day) => {
    return day.toDateString() === today.toDateString();
  };
  
  // Function to check if a date is selected
  const isSelected = (day) => {
    return day.toDateString() === selectedDate.toDateString();
  };
  
  // Get the event count for a specific day
  const getEventCount = (day) => {
    return events.filter(event => 
      event.date.toDateString() === day.toDateString()
    ).length;
  };
  
  // Group calendar days by week
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="calendar-wrapper">
      {/* Calendar header with month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth('prev')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        
        <h3 className="font-medium text-lg">
          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        <button 
          onClick={() => navigateMonth('next')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      {/* Day names header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="calendar-grid">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((day, dayIndex) => {
              const eventCount = getEventCount(day.date);
              return (
                <button
                  key={dayIndex}
                  onClick={() => setDate(new Date(day.date))}
                  className={`
                    relative flex flex-col items-center justify-center rounded-lg py-2
                    ${day.isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-50'}
                    ${isToday(day.date) ? 'bg-blue-50 text-blue-700' : ''}
                    ${isSelected(day.date) ? 'bg-academize-orange/10 ring-2 ring-academize-orange ring-inset font-bold text-academize-orange' : ''}
                  `}
                >
                  <span className="text-sm">
                    {day.date.getDate()}
                  </span>
                  
                  {eventCount > 0 && (
                    <div className="flex justify-center space-x-0.5 mt-1">
                      {hasEvents(day.date) && Array(Math.min(eventCount, 3)).fill(0).map((_, i) => {
                        // Get the first few events for this day to show their type colors
                        const dayEvents = events
                          .filter(event => event.date.toDateString() === day.date.toDateString())
                          .slice(0, 3);
                        
                        const eventType = dayEvents[i]?.type || 'other';
                        const color = getEventColor(eventType).indicator;
                        
                        return (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full ${color}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div> Classes
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div> Meetings
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div> Deadlines
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div> Other
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date(2025, 4, 13)); // May 13, 2025
  const [view, setView] = useState<"day" | "week">("day");
  
  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    return events.some(event => event.date.toDateString() === day.toDateString());
  };

  // Events for the selected date
  const selectedDateEvents = useMemo(() => {
    return events
      .filter(event => event.date.toDateString() === date.toDateString())
      .sort((a, b) => {
        const timeA = a.time.split(" - ")[0];
        const timeB = b.time.split(" - ")[0];
        return timeA.localeCompare(timeB);
      });
  }, [date]);

  // Generate the week dates for week view
  const weekDates = useMemo(() => {
    const result = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start with Sunday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      result.push(day);
    }
    return result;
  }, [date]);

  // Navigate to next/previous day or week
  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(date.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(date.getDate() + (direction === 'next' ? 7 : -7));
    }
    setDate(newDate);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-academize-orange">
            My Schedule
          </h1>
          <p className="text-gray-500">Manage your classes, meetings, and deadlines</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant={view === "day" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setView("day")}
              className={view === "day" ? "bg-white shadow-sm" : ""}
            >
              Day
            </Button>
            <Button 
              variant={view === "week" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setView("week")}
              className={view === "week" ? "bg-white shadow-sm" : ""}
            >
              Week
            </Button>
          </div>
          <Button className="bg-academize-orange hover:bg-academize-orange/90 shadow-lg shadow-orange-200">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Card - Improved with the new calendar component */}
        <Card className="lg:col-span-1 border-l-4 border-l-academize-orange shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-academize-orange" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CalendarView 
              date={date}
              setDate={setDate}
              selectedDate={date}
              hasEvents={hasEvents}
            />
          </CardContent>
        </Card>

        {/* Events Card - Remains mostly the same */}
        <Card className="lg:col-span-2 shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {view === "day" ? (
                    <h2 className="text-xl font-semibold">
                      {date.toLocaleDateString("en-US", { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </h2>
                  ) : (
                    <h2 className="text-xl font-semibold">
                      Week of {weekDates[0].toLocaleDateString("en-US", { 
                        month: 'short', 
                        day: 'numeric'
                      })} - {weekDates[6].toLocaleDateString("en-US", { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h2>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => navigate('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => navigate('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {view === "day" ? (
              // Day view
              <>
                {selectedDateEvents.length > 0 ? (
                  <div className="flex flex-col">
                    {selectedDateEvents.map((event) => {
                      const colors = getEventColor(event.type);
                      return (
                        <div 
                          key={event.id} 
                          className="p-4 border-l-8 rounded-lg hover:bg-gray-50 transition-colors shadow hover:shadow-md cursor-pointer mb-6"
                          style={{ borderLeftColor: event.type === "class" ? "#3b82f6" : 
                                  event.type === "meeting" ? "#9333ea" : 
                                  event.type === "deadline" ? "#ef4444" : "#10b981" }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge className={colors.badge}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          
                          {event.description && (
                            <p className="text-gray-600 mb-3 text-sm">{event.description}</p>
                          )}
                          
                          <div className="flex flex-wrap gap-y-2">
                            <div className="flex items-center text-sm text-gray-500 mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                              <span className="mx-2">•</span>
                              <span>{event.duration}</span>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center text-sm text-gray-500 mr-4">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {(event.attendees || event.isVirtual) && (
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              {event.attendees && (
                                <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-full">
                                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{event.attendees} attendees</span>
                                </div>
                              )}
                              {event.isVirtual && (
                                <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                  <Video className="h-4 w-4 mr-1" />
                                  <span>Virtual</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-4">
                      <CalendarIcon className="h-12 w-12 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600">No events scheduled for this day</h3>
                    <p className="text-gray-500 mt-1">Your calendar is clear. Enjoy your free time!</p>
                    <Button className="mt-6" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                )}
              </>
            ) : (
              // Week view
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                  {weekDates.map((day, index) => {
                    const dayEvents = events.filter(event => 
                      event.date.toDateString() === day.toDateString()
                    );
                    const isCurrentDay = day.toDateString() === date.toDateString();
                    
                    return (
                      <div key={index} className={`border rounded-lg ${isCurrentDay ? 'ring-2 ring-academize-orange' : ''}`}>
                        <div 
                          className={`p-2 text-center font-medium border-b 
                          ${isCurrentDay ? 'bg-academize-orange/10' : 'bg-gray-50'}`}
                          onClick={() => setDate(new Date(day))}
                        >
                          <div className="text-xs text-gray-500">
                            {day.toLocaleDateString("en-US", { weekday: 'short' })}
                          </div>
                          <div className={`text-lg ${isCurrentDay ? 'text-academize-orange' : ''}`}>
                            {day.getDate()}
                          </div>
                        </div>
                        <div className="p-1 space-y-1 h-48 overflow-y-auto">
                          {dayEvents.length > 0 ? (
                            dayEvents.map(event => {
                              const colors = getEventColor(event.type);
                              return (
                                <div 
                                  key={event.id}
                                  className={`p-1 text-xs rounded cursor-pointer ${colors.badge}`}
                                  onClick={() => {
                                    setDate(new Date(day));
                                    setView("day");
                                  }}
                                >
                                  <div className="font-medium truncate">{event.title}</div>
                                  <div className="text-xs opacity-80">{event.time.split(" - ")[0]}</div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                              No events
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Deadlines Card - Remains the same */}
      <Card className="mt-6 border-t-4 border-t-gray-200 shadow">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events
              .filter(event => event.type === "deadline" && new Date() <= event.date)
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 3)
              .map(event => (
                <div key={event.id} className="border rounded-lg p-3 bg-gradient-to-br from-white to-red-50">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-red-100 text-red-800 mb-2">Deadline</Badge>
                    <div className="text-sm font-semibold text-red-600">
                      {Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">{event.title}</h3>
                  <div className="text-sm text-gray-500">
                    Due on {event.date.toLocaleDateString("en-US", { 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {event.time}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;