export interface ImageStyle {
  overlay?: {
    from: string;
    to: string;
  };
}

export interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  hours: string;
  rating: number;
  reviews: number;
  image_url: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  amenities: string[];
  image_style: ImageStyle;
  created_at: string;
  updated_at: string;
}