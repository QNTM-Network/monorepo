import dbConnect from "../utils/dbConnect";
import  Quant  from '../models/Quant';


interface Props {
  quants: any;
}


const Web = ({quants}: Props) => {

  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
    </div>
  );
}

export default Web;


export async function getServerSideProps() {

  
  
await dbConnect();
  // cutoff 3am today
  const cutoff = new Date();
console.log('cutoff', cutoff);
  // find quants that are not completed and are due before today and don't have status of 0
  console.log('cutoff', new Date(cutoff.setHours(3,0,0,0)));
  const data = await Quant.find({status: {$ne: 0}, date: {$lte: cutoff}}).sort({date: 1}).lean();

  const quants = JSON.parse(JSON.stringify(data));

  

  return { props: { quants } };
}

