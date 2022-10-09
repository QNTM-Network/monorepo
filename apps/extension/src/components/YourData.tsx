import Data from "./Data";

const YourData = ( {pageContent} ) => {
	return (
		<div>
			<p className='page-title'>Your Data</p>
			<Data pageContent={pageContent}/>
		</div>
	);
};

export default YourData;

