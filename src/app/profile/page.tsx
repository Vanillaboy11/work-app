'use client';

import { FC } from 'react';

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-blue-600">
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200">
                {/* Profile Image Placeholder */}
                <div className="h-full w-full rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8">
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Software Developer</p>
            <div className="mt-4 text-gray-700">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 text-gray-900">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 text-gray-900">New York, USA</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React", "TypeScript", "Next.js", "TailwindCSS"].map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;