import mongoose, { Schema, Model } from 'mongoose';

export interface ISettings {
  _id?: string;
  storeName: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappChannel: string;
  googleMapsLink: string;
  address: string;
  businessHours: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    storeName: {
      type: String,
      required: true,
      default: 'Lashari Mobile Zone',
    },
    phone: {
      type: String,
      required: true,
      default: '03445979016',
    },
    email: {
      type: String,
      required: true,
      default: 'ik4937444@gmail.com',
    },
    whatsappNumber: {
      type: String,
      required: true,
      default: '03445979016',
    },
    whatsappChannel: {
      type: String,
      required: true,
      default: 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g',
    },
    googleMapsLink: {
      type: String,
      required: true,
      default: 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7',
    },
    address: {
      type: String,
      required: true,
      default: 'Lashari Mobile Zone, Main Market',
    },
    businessHours: {
      type: String,
      required: true,
      default: '10:00 AM to 10:00 PM (Daily)',
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
