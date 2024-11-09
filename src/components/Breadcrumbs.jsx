import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export default function Breadcrumbs () {
  const location = useLocation();
  const pathName = location.pathname;
  const parts = pathName.split('/').filter(Boolean);

  return (
    <div className='flex flex-row gap-2 font-poppins text-sm bg-gray-400/50 px-10 rounded-lg align-middle'>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <Link className='text-secondary text-lg' to={`/${parts.slice(0, index + 1).join('/')}`} data-aos='fade-right' data-aos-delay={index * 100}>{part}</Link>
          {index < parts.length - 1 && <span className='text-primary text-lg' data-aos='fade-right'>/</span>}
        </React.Fragment>
      ))}
      {/* <p>{parts[parts.length - 1]}</p> */}
    </div>
  );
}
