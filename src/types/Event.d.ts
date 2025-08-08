import { DateValue } from "@nextui-org/react";

export interface IRegency {
  id: number;
  name: string;
}

export interface IEvent {
  name: string;
  slug: string;
  category: string;
  isPublish: string | boolean;
  isFeatured: string | boolean;
  isOnline: string | boolean;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  banner: string | FileList;
}

export interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}
