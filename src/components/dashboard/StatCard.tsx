
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  progress?: number;
  progressColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  progress,
  progressColor = "bg-academize-orange",
  className = "" 
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{value}</h3>
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          
          {progress !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 w-full bg-gray-100 rounded-full">
                <div 
                  className={`h-1.5 ${progressColor} rounded-full`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">{progress}%</div>
            </div>
          )}
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
