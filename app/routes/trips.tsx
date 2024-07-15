import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const tripName = formData.get('tripName');

  // In a real app, you'd save this to a database
  const newTripId = '123';

  return redirect(`/trips/${newTripId}`);
};

export default function Add() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Create a New Trip</h1>
      <Form method='post' action='/trips'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
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
    </div>
  );
}
