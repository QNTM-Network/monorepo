import mongoose from 'mongoose';
import { IAdmin } from 'ui';

const AdminSchema = new mongoose.Schema<IAdmin>({
  password: { type: String },
  created_at: { type: Date },
  daily_count: [{
    date: { type: Date },
    count: { type: Number }
  }],
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
