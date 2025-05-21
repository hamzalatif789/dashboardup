import { Users, Clock, BookOpen, DollarSign } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApexCourseChart from "@/components/dashboard/ApexCourseChart";
import CourseCard from "@/components/dashboard/CourseCard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="w-full max-w-md mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md py-2 pl-10 pr-4 bg-gray-50 border-0 focus:ring-1 focus:ring-academize-orange"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-md mb-6 bg-transparent">
            <TabsTrigger 
              value="all" 
              className={`border-b-2 pb-2 rounded-none ${activeTab === 'all' ? 'border-academize-orange text-academize-orange' : 'border-transparent'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress"
              className={`border-b-2 pb-2 rounded-none ${activeTab === 'in-progress' ? 'border-academize-orange text-academize-orange' : 'border-transparent'}`}
              onClick={() => setActiveTab('in-progress')}
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className={`border-b-2 pb-2 rounded-none ${activeTab === 'upcoming' ? 'border-academize-orange text-academize-orange' : 'border-transparent'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className={`border-b-2 pb-2 rounded-none ${activeTab === 'completed' ? 'border-academize-orange text-academize-orange' : 'border-transparent'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">View All</div>
          </div>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard 
              id="1"
              title="Primer Courses - Full Lifetime Access"
              instructor="Lecture 1"
              progress={75}
              tag="HOT"
              tagColor="bg-orange-500"
              actionText="Learn now"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
            <CourseCard 
              id="2"
              title="Flutter Interaction Course With David"
              instructor="Completed"
              progress={100}
              actionText="Learn now"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
            <CourseCard 
              id="3"
              title="Interaction Design Course Figma"
              instructor="Not started"
              progress={0}
              actionText="Learn now"
              tag="NEW"
              tagColor="bg-blue-500"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
            <CourseCard 
              id="4"
              title="React JS Course For Beginners"
              instructor="Lecture 1"
              progress={25}
              actionText="Learn now"
              tag="NEW"
              tagColor="bg-blue-500"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
            <CourseCard 
              id="5"
              title="Adobe AI Course From Beginner To Pro 2024"
              instructor="Lecture 3"
              progress={40}
              actionText="Learn now"
              tag="HOT"
              tagColor="bg-orange-500"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
            <CourseCard 
              id="6"
              title="Framer Full Course - Beginner To Pro 2024"
              instructor="Lecture 5"
              progress={60}
              actionText="Learn now"
              tag="NEW"
              tagColor="bg-green-500"
              image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
            />
          </TabsContent>
          
          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* In progress courses */}
              <CourseCard 
                id="1"
                title="Primer Courses - Full Lifetime Access"
                instructor="Lecture 1"
                progress={75}
                tag="HOT"
                tagColor="bg-orange-500"
                actionText="Learn now"
                image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
              />
              <CourseCard 
                id="5"
                title="Adobe AI Course From Beginner To Pro 2024"
                instructor="Lecture 3"
                progress={40}
                actionText="Learn now"
                tag="HOT"
                tagColor="bg-orange-500"
                image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Upcoming courses */}
              <CourseCard 
                id="3"
                title="Interaction Design Course Figma"
                instructor="Not started"
                progress={0}
                actionText="Learn now"
                tag="NEW"
                tagColor="bg-blue-500"
                image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Completed courses */}
              <CourseCard 
                id="2"
                title="Flutter Interaction Course With David"
                instructor="Completed"
                progress={100}
                actionText="Learn now"
                image="/lovable-uploads/03fedaa9-0428-437f-975f-c02caeb8e62b.png"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Statistics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Learning Hours</CardTitle>
                  <select className="bg-white border border-gray-200 rounded-md px-3 py-1 text-sm">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ApexCourseChart />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <StatCard 
                title="Tasks Completed" 
                value="20" 
                icon={<BookOpen className="text-academize-orange h-5 w-5" />} 
                progress={70} 
                progressColor="bg-green-500" 
                className="bg-white" 
              />
              
              <StatCard 
                title="Hours Played" 
                value="5" 
                icon={<Clock className="text-blue-500 h-5 w-5" />} 
                progress={85}
                progressColor="bg-blue-500" 
                className="bg-white" 
              />
              
              <StatCard 
                title="Points Earned" 
                value="20" 
                icon={<Users className="text-orange-500 h-5 w-5" />} 
                progress={50}
                progressColor="bg-orange-500" 
                className="bg-white" 
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;