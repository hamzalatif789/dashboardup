import React from 'react';
import { User, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ProfileSection = () => {
  return (
    <div className="flex flex-col bg-white"> {/* Removed space-y-6 to eliminate gaps */}
      {/* Profile Card */}
      <div className="p-5 flex flex-col items-center"> {/* Replaced Card with div */}
        <div className="flex justify-between w-full mb-2">
          <h3 className="text-sm font-medium">Your Profile</h3>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
        
        <div className="relative my-4">
          <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h3 className="font-semibold text-lg">Admin</h3>
        <p className="text-xs text-gray-500 mb-4">admin2024@gmail.com</p>
        
        <div className="flex space-x-4">
          <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-500" />
          </button>
          <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Chart Placeholder */}
      <div className="bg-white p-5"> {/* Removed rounded-lg for continuous flow */}
        <div className="h-24 flex items-end space-x-2">
          <div className="w-1/5 bg-gradient-to-t from-academize-orange to-orange-200 h-1/4 rounded-t"></div>
          <div className="w-1/5 bg-gradient-to-t from-academize-orange to-orange-200 h-1/2 rounded-t"></div>
          <div className="w-1/5 bg-gradient-to-t from-academize-orange to-orange-200 h-2/3 rounded-t"></div>
          <div className="w-1/5 bg-gradient-to-t from-academize-orange to-orange-200 h-4/5 rounded-t"></div>
          <div className="w-1/5 bg-gradient-to-t from-academize-orange to-orange-200 h-full rounded-t"></div>
        </div>
      </div>
      
      {/* Statistics - All converted to simple divs instead of Cards */}
      <div className="p-5"> {/* First stat section */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-500 font-medium">20</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">Tasks completed</span>
        </div>
        <div className="mb-1">
          <Progress value={70} className="h-1.5 bg-gray-100" indicatorClassName="bg-green-500" />
        </div>
        <div className="text-xs text-gray-500 text-right">70%</div>
      </div>
      
      <div className="p-5"> {/* Second stat section */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-500 font-medium">5</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">Hours played</span>
        </div>
        <div className="mb-1">
          <Progress value={85} className="h-1.5 bg-gray-100" indicatorClassName="bg-blue-500" />
        </div>
        <div className="text-xs text-gray-500 text-right">85%</div>
      </div>
      
      <div className="p-5"> {/* Third stat section */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-500 font-medium">20</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">Points earned</span>
        </div>
        <div className="mb-1">
          <Progress value={50} className="h-1.5 bg-gray-100" indicatorClassName="bg-orange-500" />
        </div>
        <div className="text-xs text-gray-500 text-right">50%</div>
      </div>
    </div>
  );
};

export default ProfileSection;