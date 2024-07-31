import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { trips } from '~/db/schema';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // Fetch trip details from a database or API
  const { tripId } = params;
  const currentTrip = await db
    .select()
    .from(trips)
    .where(eq(trips.id, String(tripId)));

  return currentTrip[0];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const planDescription = formData.get('planDescription');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  // In a real app, you'd save this to a database
  console.log('New plan:', { planDescription, startDate, endDate });

  // return redirect(`/trips/${params.tripId}`);
  return null;
};

//!TODO: Should rename this file to plan._new.tsx

const Plan = () => {
  const currentTrip = useLoaderData<typeof loader>();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>{currentTrip.name}</h1>
      <h2 className='text-xl mt-4'>Plans</h2>
      {/* <Form method='post' action={`/trips/${tripId}/add-plan`}> */}
      <Form method='post'>
        <div>
          <label
            htmlFor='planDescription'
            className='block text-sm font-medium text-gray-700'
          >
            Plan Description
          </label>
          <input
            type='text'
            name='planDescription'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <div>
          <label
            htmlFor='startDate'
            className='block text-sm font-medium text-gray-700'
          >
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <div>
          <label
            htmlFor='endDate'
            className='block text-sm font-medium text-gray-700'
          >
            End Date
          </label>
          <input
            type='date'
            name='endDate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white p-2 rounded'
        >
          Add Plan
        </button>
      </Form>
      <Link to='/'>Back home</Link>
    </div>
  );
};

export default Plan;
