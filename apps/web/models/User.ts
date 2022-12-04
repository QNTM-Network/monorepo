import mongoose from 'mongoose';
import { IUser } from 'ui'

const UserSchema = new mongoose.Schema<IUser>({
	address: { type: String },
	created_at: { type: Date },
	daily_count: [{ 
		date: { type: Date },
		count: { type: Number },
		expected: { type: Number },
		percentage: { type: Number },
		tags: [{
			name: { type: String },
			count: { type: Number }
		}]
	}],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
