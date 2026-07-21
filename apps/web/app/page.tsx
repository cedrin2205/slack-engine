import { redirect } from 'next/navigation';

export default function HomePage() {
  // Instantly routes the user to your existing login page
  redirect('/login');
}