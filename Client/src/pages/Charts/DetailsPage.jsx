import React from 'react';
import { useParams } from 'react-router-dom';
import { UserData } from './chart';

const DetailsPage = () => {
  const { label } = useParams(); 

  const data = UserData.find(item => item.label === label);

  return (
    <>
    <div className=' border border-blue-900 p-2 w-[700px] m-auto mt-6'>
      <h1 className='font-bold text-2xl'>{label}</h1>
      {data ? (
        <ul className='py-2'>
          {data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No items found for {label}</p>
      )}
       <a href='/charts' className='bg-blue-600 text-center text-white rounded-md p-2'>Back to Charts</a>
    </div>
    </>
  );
};

export default DetailsPage;
