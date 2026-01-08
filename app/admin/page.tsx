import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const decoded = token ? verifyToken(token) : null;

  if (decoded) {
    redirect('/admin/dashboard');
  }

  redirect('/admin/login');
}
