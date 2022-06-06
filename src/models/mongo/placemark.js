import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  lat: Number,
  lon: Number,
  desc: String,
  filter: String,
  categoryName: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
