import { json, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/db/db.server';
import { trips } from '~/db/schema';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const allTrips = await db.select().from(trips);

  return json(allTrips);
};

export default function Index() {
  const allTrips = useLoaderData<typeof loader>();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Trip Planner</h1>
      <Link to='/trips' className='text-blue-500'>
        Create a New Trip
      </Link>
      {allTrips.map((trip) => (
        <div key={trip.id}>
          <Link to={`/plan/${trip.id}`}>{trip.name}</Link>
        </div>
      ))}
    </div>
  );
}
