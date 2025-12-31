import ComplaintPage from '@/components/pages/complaint/ComplaintPage';
import { getCachedSession } from '~/lib/cache_server_route_data';
import { redirect } from 'next/navigation';

export default async function Complaint() {
  const session = await getCachedSession();
  if (!session) {
    redirect('/login');
  }

  return <ComplaintPage />;
}

export const metadata = {
  title: 'Raise a Complaint — SwachhAI'
};
