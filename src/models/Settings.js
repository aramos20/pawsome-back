import { Schema } from "mongoose";

// Esquema de Mongoose
const SettingsSchema = new Schema({
  label: { type: String, required: true }, // label debe ser un string
  value: { type: Object, required: true }, // value almacena los roles en un objeto
});

// Exportar modelo
const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
