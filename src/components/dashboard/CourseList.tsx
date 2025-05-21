import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, MoreVertical, Star } from "lucide-react";

type CourseStatus = "active" | "draft" | "completed";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  students: number;
  status: CourseStatus;
  image: string;
  rating?: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Business Analytics",
    category: "Analytics",
    progress: 85,
    students: 1234,
    status: "active",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    rating: 4.8
  },
  // ... other courses
];

const getStatusColor = (status: CourseStatus) => {
  switch(status) {
    case "active": return "bg-green-100 text-green-800";
    case "draft": return "bg-yellow-100 text-yellow-800";
    case "completed": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const CourseList = () => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">Your Courses</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Track your teaching progress</p>
        </div>
        <Button variant="ghost" className="text-academize-orange hover:bg-academize-orange/10">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30">
                    <MoreVertical className="h-4 w-4 text-white" />
                  </Button>
                </div>
                {course.rating && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold truncate mb-2">{course.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2 text-academize-orange" />
                    {course.category}
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-academize-orange" />
                    {course.students.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-academize-orange">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-academize-orange h-3 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;