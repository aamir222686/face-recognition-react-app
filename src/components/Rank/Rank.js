import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3 tc code'>
				{`${name}, your current entry count is....`}
			</div>
			<div className='white f1 tc code'>
				{entries}
			</div>
		</div>
		)
}

export default Rank;