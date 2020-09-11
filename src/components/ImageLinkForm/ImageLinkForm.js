import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onDetectButton}) => {
	return ( 
		<div className='f4 tc code'>
			<p>
				{'This Will Detect Faces In Any Picture. Give it A Try!!'}
			</p>
			<div className='center'>
				<div className='pa3 shadow-3 w-70 center form'>
					<input onChange={onInputChange} className='f4 w-70 pa2 center' type="text" placeholder='Image URL'/>
					<button onClick={onDetectButton} className='pa1 w-30 grow link f4 ph3 pv2 dib white bg-light-purple'>Detect</button>
				</div>
			</div>
		</div>
		)
}

export default ImageLinkForm;