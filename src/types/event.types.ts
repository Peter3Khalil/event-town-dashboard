import { GetAllQueryParams, GetAllResponse } from '@/types/global.types';

export type GetAllEventsResponse = GetAllResponse<Event>;

export type Event = {
  _id: string;
  organizer: Organizer;
  organizationName: string;
  organizationWebsite?: string;
  organizerPlan: 'free' | 'basic' | 'pro' | 'standard' | 'premium';
  eventName: string;
  eventAddress?: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventImages?: string[];
  eventImage?: string;
  ticketEventLink: string;
  eventPrice: number;
  eventDescription?: string;
  eventStatus: EventStatus;
  createdAt: string;
  updatedAt: string;
};

export type Organizer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type EventCategory = {
  _id: string;
  title: string;
};

export type CreateEventResponse = {
  organizationName: string;
  organizationWebsite: string;
  organizerPlan: string;
  eventName: string;
  eventAddress: string;
  eventCategory: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventImages: string[];
  ticketEventLink: string;
  eventPrice: number;
  eventDescription: string;
};

export type DeleteErrorResponse = {
  errors: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
};

export interface EventAction {
  status: EventStatus;
  event: Event;
  message: string;
}

export type EventStatus = 'pending' | 'accepted' | 'rejected' | 'all';

export type EventsQueryParams = GetAllQueryParams & {
  eventStatus: EventStatus;
  sort?: 'eventPrice' | '-eventPrice';
};

export type EventStatusWithOutAll = Exclude<EventStatus, 'all'>;

export type AddEventType = Omit<
  Event,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'organizer'
  | 'eventStatus'
  | 'eventCategory'
> & {
  eventCategory: string[];
};
