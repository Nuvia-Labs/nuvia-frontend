"use client";

import { FriendCard } from "./FriendCard";
import type { Friend } from "./types";

interface FriendsListProps {
  friends: Friend[];
}

export const FriendsList = ({ friends }: FriendsListProps) => {
  return (
    <div className="px-4 pb-6">
      <div className="space-y-3">
        {friends.map((friend, index) => (
          <FriendCard key={friend.id} friend={friend} index={index} />
        ))}
      </div>
    </div>
  );
};
