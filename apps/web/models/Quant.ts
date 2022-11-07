import mongoose from 'mongoose';
import { IQuant } from 'ui' 

const QuantSchema = new mongoose.Schema<IQuant>({
  name: { type: String },
  created_at: { type: Date },
  period: { type: String },
  user: { type: String },
  notes: { type: String },
  date: { type: Date },
  tags: [{ type: String }],
  status: { type: Number },
});

export default mongoose.models.Quant|| mongoose.model('Quant', QuantSchema);
