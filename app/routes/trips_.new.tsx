import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { db } from '~/db/db.server';
import { trips } from '~/db/schema';

type NewTrip = typeof trips.$inferInsert;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const tripName = formData.get('tripName') as string;

  // In a real app, you'd save this to a database
  const newTrip: NewTrip = {
    name: tripName,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };

  const result = await db.insert(trips).values(newTrip).returning({
    insertedId: trips.id,
  });

  return redirect(`/trips/${result[0].insertedId}`);
};

export default function Add() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Create a New Trip</h1>
      <Form method='post' action='/trips'>
        <div>
          <label
            htmlFor='tripName'
            className='block text-sm font-medium text-gray-700'
          >
            Trip Name
          </label>
          <input
            type='text'
            name='tripName'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white p-2 rounded'
        >
          Create Trip
        </button>
      </Form>
      <Link to='/'>Back home</Link>
    </div>
  );
}
