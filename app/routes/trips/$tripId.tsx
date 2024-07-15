import { useLoaderData, Form, redirect } from '@remix-run/react';

export const loader = async ({ params }) => {
  // Fetch trip details from a database or API
  return { tripId: params.tripId, tripName: 'Sample Trip', plans: [] };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const planDescription = formData.get('planDescription');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  // In a real app, you'd save this to a database
  console.log('New plan:', { planDescription, startDate, endDate });

  return redirect(`/trips/${params.tripId}`);
};

export default function TripDetails() {
  const { tripId, tripName, plans } = useLoaderData();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>{tripName}</h1>
      <h2 className='text-xl mt-4'>Plans</h2>
      <ul>
        {plans.map((plan, index) => (
          <li key={index}>{plan.description}</li>
        ))}
      </ul>
      <Form method='post' action={`/trips/${tripId}/add-plan`}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Plan Description
          </label>
          <input
            type='text'
            name='planDescription'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
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
    </div>
  );
}
