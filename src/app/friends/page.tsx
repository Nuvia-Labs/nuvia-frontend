"use client";

import { HeroSection } from "./_components/HeroSection";
import { FriendsList } from "./_components/FriendsList";
import { mockFriends } from "./_components/data";

export default function Friends() {
  return (
    <div className="w-full max-w-sm mx-auto min-h-screen">
      <HeroSection />
      <FriendsList friends={mockFriends} />
    </div>
  );
}
