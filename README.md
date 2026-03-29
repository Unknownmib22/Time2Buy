To view our product demo : https://youtu.be/RGUt-_pUU7E?si=Nvb4wMr-PGpeF18D
To view presentation of t2b : https://drive.google.com/drive/folders/1eE4PZ6LStDBmVTejjG2Pxtk-I5H4BWp_?usp=sharing
Time to Buy (T2B)
A hyperlocal inventory lifecycle engine that ensures every product gets sold before it becomes waste.
Our Problem Statement :

                      Local retailers often face challenges in clearing overstocked or near-expiry inventory due to limited digital presence and visibility. At the same time, nearby customers remain unaware of these
time-sensitive deals, missing out on potential savings. The lack of effective discovery platforms
further widens the gap between supply and demand at a hyperlocal level.

This disconnect results in lost revenue opportunities for retailers and reduced access to affordable
products for customers. The absence of a system that enables real-time, location-based deal
discovery highlights the need for a solution that connects local businesses with nearby consumers
in a timely and efficient manner.

Our Proposed solution and Product Summary :
            
                        Easy access system for both retailers and customers to have an awareness of  available overstocked and near expiry products around them and to get them in a affordable price for the fellow retailers (B2B) and consumers (B2C). 

Solution Architecture :
      
                      We are creating a hybrid web and mobile first app based product which has 4 different endpoints
   Retailer :
         Retailer Login : Data input “Name of the Stores”, “Location”. 
Product entry by Barcode Scanning of FMCG projects and make data cleaning based on set of inputs 
•	Product name (a)
•	Amount of stock (b)
•	Manufacturing Date (c)
•	Expiry date (d)
•	Price of the product [MRP] (p)

For Example ;

Name of stores	Location (Area)	Product Name 	Amount of Stock	Price of Product (each)	Manufacturing Date 	Expiry Date
Royal Stores	Perambur	Amul Butter (50g)	20	52	29.03.2026	27.06.2026
Royal 
Stores	Perambur 	Bru Instant Coffee Powder(100g)	15	130	20.04.2025	20.04.2026
Premium Stores	Perambur	Amul Butter (50g)	7	52	29.03.2026	27.06.2026
Premium Stores	Perambur	Bru Instant Coffee Powder(100g)	30	130	20.04.2025	20.04.2026

      This is a sample table where there can be many stores and products so the database needs to be maintained properly.                     






Core Engine : (Algorithms)
           We are creating a rule based model for creating a sale which is determined the following,
•	Sale Price (dynamic Pricing)
•	Date of Sale Starts
•	Date of Sale Ends
•	Surrounding Radius = 2km from location of the shop
•	Lifespan  

Sale Price: 
         Sale Price = P – (1/7)P
P  Price of the Product (MRP)

Dynamic Pricing Formula:

from datetime import datetime, timedelta

def calculate_price_decay(mrp, start_str, end_str):
    current_date = datetime.strptime(start_str, "%Y-%m-%d")
    end_date = datetime.strptime(end_str, "%Y-%m-%d")
    
    # Reduction amount based on your formula: (0.01) * MRP
    reduction_step = (1 / 100) * mrp
    
    current_price = float(sale_price)

    print(f"{'Date':<12} | {'Price':<10}")
    print("-" * 25)

    while current_date <= end_date:
        print(f"{current_date.strftime('%Y-%m-%d')} | ₹{max(0, current_price):.2f}")
        
        # Update values for the next 2-day jump
        current_date += timedelta(days=2)
        current_price -= reduction_step

calculate_price_decay(mrp=[P (Price of the product)], start_str="[Date of Sale Starts]", end_str="[Date of Sale Ends]")

Date of Sale Starts :
        Date of sale starts = Expiry date – (1/5) Lifespan        

Date of Sale Ends : 
         Date of Sale ends = Expiry Date – 1 days

Lifespan  (Expiry Date – Manufacturing Date)in days 


 Product_info() 

•	Recent Sale happening in the product
•	Name of the stores
•	Stocks available for the sale 
•	Date of sale starts
•	Date of sale ends
•	Sale price for that day
•	Expiry date

 

Customer End UI/UX :
Common UI details :
•	Mobile first app
•	Minimalistic Glassmorphic light theme and all elements should be visible with vibrant colours
•	Logo is given 
            

B2C
•	Find the people in the surrounding radius when the sale starts
•	Product based sorting and Shop based sorting
B2B
•	Find the fellow retailers around the same surrounding radius
•	If the name of the product in the nearby shops are as same as the product that came up for sale then check the number of stock in nearby shops of the same product and if it is showing demand for the product notify the fellow retailers.
A small Business model here:
•	Run Advertisement for the shops in the product based sorting to the particular shops as the sponsored on search results.
•	Connect towards hotel like networks and run as the distributer.(future not now)
Target Audience :
Tier 2 & 3 Cities and semi urban area people who wants to know the information of the discounts 

Thank you 
“ Information, Information is wealth “





# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
