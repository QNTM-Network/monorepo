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
  let cutoff = new Date();
  cutoff.setDate(cutoff.getDate());
  // find quants that are not completed and are due before today and don't have status of 0
  const data = await Quant.find({status: {$ne: 0}, date: {$lte: cutoff}}).sort({date: 1}).lean();

  const quants = JSON.parse(JSON.stringify(data));

  

  return { props: { quants } };
}

