import mongoose from 'mongoose';
import { IQuant } from 'ui' 

const QuantSchema = new mongoose.Schema<IQuant>({
  name: { type: String },
  created_at: { type: Date },
  reoccurring: { type: Boolean },
  date: { type: Date },
  tags: [{ type: String }],
});

export default mongoose.models.Quant|| mongoose.model('Quant', QuantSchema);
