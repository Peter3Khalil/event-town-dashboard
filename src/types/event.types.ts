import { GetAllQueryParams, GetAllResponse } from '@/types/global.types';

export type GetAllEventsResponse = GetAllResponse<Event>;

export type Event = {
  organizerPlan: 'free' | 'basic' | 'standard' | 'premium';
  _id: string;
  organizerName: string;
  organizationName: string;
  organizationPhoneNumber: string;
  organizationEmail: string;
  organizationWebsite: string;
  eventName: string;
  eventAddress: string;
  eventCategory: EventCategory[];
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventPlace: string;
  eventImage: string;
  ticketEventLink: string;
  eventPrice: number;
  eventDescription: string;
  eventStatus: string;
  numberOfGoingUsers: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  expirePlanDate?: string;
  comments: string[];
  id: string;
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

export type NewEventType = Omit<
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
