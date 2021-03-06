import mongoose from 'mongoose';

const CampaignSchema = {
    schema: new mongoose.Schema(
        {
            title: String,
            poolSize: Number,
            choices: [String],
            email: String
        }
    ),
    name: 'Campaign'
};

export default CampaignSchema;
