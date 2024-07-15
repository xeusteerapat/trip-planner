import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader: LoaderFunction = async () => {
  return json({
    destinations: [],
  });
};

export default function Index() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Trip Planner</h1>
      <Link to='/trips' className='text-blue-500'>
        Create a New Trip
      </Link>
      {/* Here you would list all trips */}
    </div>
  );
}
