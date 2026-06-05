import WatchContent from './WatchContent';

export async function generateStaticParams() {
  // Return placeholder IDs for static export
  return [
    { id: 'dark-knight' },
    { id: 'interstellar' },
    { id: 'inception' }
  ];
}

export default function Page() {
  return <WatchContent />;
}
