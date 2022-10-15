import mongoose from 'mongoose';

const QuantSchema = new mongoose.Schema({
  name: { type: String },
  created_at: { type: Date },
  reoccurring: { type: Boolean }
});

export default mongoose.models.Quant|| mongoose.model('Quant', QuantSchema);
