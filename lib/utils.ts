import { type ClassValue, clsx } from "clsx"
import { User } from "firebase/auth"
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarColor(name: string | null) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ]
  const charCode = name ? name.charCodeAt(0) - 65 : 0; // Handle null case
  return colors[charCode % colors.length]
}