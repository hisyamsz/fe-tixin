import { DateValue } from "@nextui-org/react";

export interface IRegency {
  id: number;
  name: string;
}

export interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isPublish?: string | boolean;
  isFeatured?: string | boolean;
  isOnline?: string | boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string;
    address: string;
    coordinates: number[];
  };
  banner?: string | FileList;
}

export interface IEventForm extends IEvent {
  startDate?: DateValue;
  endDate?: DateValue;
  region?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}
