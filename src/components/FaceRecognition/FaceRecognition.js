import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center pa3'>
			<div className='absolute'>
				<img id='inputimage' className='shadow-3' src={imageUrl} alt="" width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>
			</div>
		 </div>
		)
}

export default FaceRecognition; 