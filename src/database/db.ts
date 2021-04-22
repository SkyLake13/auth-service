import { connect } from 'mongoose';

// mongoose.Promise = global.Promise;

export default {
    connect() {
        connect(`mongodb://az-900:1XvtzhgnTnqTk6QBk2m8kAvYC95TaNgQzEM7g6yEblgDLMy591OGLleKvDT3STp5eJ6o1oa0FQE4YtRsZxiQ0g==@az-900.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@az-900@`,
         { useNewUrlParser: true });
    }
}