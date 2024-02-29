import { Gender } from "@prisma/client";

interface StoreVerificationProps {
  verfivicationImgs: string[];
  birthday?: string;
  info?: string;
  location?: Location;
}
interface Location {
  city?: string;
  region?: string;
  street?: string;
  info?: string;
}


interface City {
  id: string;
  min: number;
  max: number;
  name: string;
  gender: Gender;
  price: number;
}

export type { StoreVerificationProps, Location, City };
