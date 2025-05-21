
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  actionText: string;
  tag?: string;
  tagColor?: string;
  image: string;
}

const CourseCard = ({
  title,
  instructor,
  progress,
  actionText,
  tag,
  tagColor = "bg-blue-500",
  image
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <div className="bg-gray-100 w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              {progress === 100 ? (
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5 text-academize-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
            </div>
          </div>
        </AspectRatio>
        
        {tag && (
          <div className="absolute top-2 right-2">
            <Badge className={`${tagColor} text-white`}>{tag}</Badge>
          </div>
        )}
        
        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-1 bg-academize-orange" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{instructor}</span>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-academize-orange"
            >
              {actionText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
