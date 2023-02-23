export class HousingClass{

    
        _id: string;
        ownerId: string;
        title: string;
        description: string;
        picture: [
            {
                url: string;
                description: string;
                isCover: boolean
            }
  
        ];
        isPublished: boolean;
        isOrdered: boolean;
        address: {
            country: {
                name: string;
                code: string
            };
            city: string;
            street: string;
            zip: number
        };
        availability: [
            {
                housingId: string;
                period: Date;
                price: number;
                capacity: number;
                reserved: number;
                id: string
            }
        ];
        id: string
    
}