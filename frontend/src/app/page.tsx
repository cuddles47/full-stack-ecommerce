import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to a specific path instead of a route group
  redirect('/home');
}