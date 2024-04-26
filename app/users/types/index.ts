export type User = {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: number;
  verified: boolean;
  followedStoresIDs: string[];
  createdAt: Date;
  updatedAt: Date;
  role: Role;
};

enum Role {
  Default = "Default",
  Seller = "Seller",
  Delivery = "Delivery",
}
