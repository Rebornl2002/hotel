import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    DayOfBirth: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Address: {
      type: String,
      required: true,
    },
    ID_Card: {
      type: String,
      require: true,
      unique: true,
    },
    Phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

//Username: "Phan Nghi"
// "DayOfBirth": "27/adsdf07/2002",
// "Email":"trantung20a02desf@gmail.com",
// "Address": "146 chiaeaaddfn thang,HN",
// "ID_Card":"25645aasasd55455",
// "Phone": "035789asddaf4125"
