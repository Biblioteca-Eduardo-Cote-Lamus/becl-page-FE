import { openSans } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customers',
};

export default function CustomersPage() {
  return (
    <div>
      <h1 className={`${openSans.className} mb-4 text-xl md:text-2xl`}>Customers</h1>
      <p>This is the customers page.</p>
    </div>
  );
}
