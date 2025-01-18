// snipcart.d.ts
interface Window {
   Snipcart: {
     store: {
       getState: () => {
         cart: {
           items: any[];
           total: number;
         };
       };
     };
   };
 }
 