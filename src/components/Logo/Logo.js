import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import square from './logosquare.png'
 



const Logo = () => {
	return (
		<div className='ma4'>
			<Tilt className="Tilt br2 shadow-3" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3"><img style={{width:'100px', height:'100px'}} alt='logo' src={square}/> </div>
			</Tilt>
		</div>
		)
}

export default Logo; 