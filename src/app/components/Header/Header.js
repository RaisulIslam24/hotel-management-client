import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
		<div className='flex flex-wrap gap-4 justify-end items-center m-5' style={{color: '#004464'}}>
			<Link href={'/'}>Home</Link>
			<Link href={'/ManageHotels'}>Manage Hotels</Link>
		</div>
	);
};

export default Header;