import { GetAllResponse } from '@/types/global.types';

export type Organizer = {
  _id: string;
  organizerName: string;
  organizationName: string;
  organizationField: string;
  organizationWebsite: string;
  organizationPhoneNumber: string;
  organizationEmail: string;
  advice: string;
  createdAt: string;
  updatedAt: string;
};
export type GetAllOrganizersResponse = GetAllResponse<Organizer>;
