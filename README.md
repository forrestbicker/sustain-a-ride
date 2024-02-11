## Inspiration
Sustain-A-Ride is a sustainability-first recurring ride-sharing app built that empowers commuters to reduce their carbon footprint on the daily. Our non-profit app strives to make carpooling an appealing alternative to driving alone, helping everyday people make eco-friendly choices and contribute to a more sustainable future.

We came up with the idea for a carpooling app upon learning that the transportation sector is the biggest contributor to greenhouse gasses and passenger cars are the number one source of transportation pollution, yet a whopping 78% of Americans drive to work alone. We figured that if we could facilitate carpooling enough to make it a competitive alternative to driving alone, we could take a significant number of cars off the road. Since passenger cars account for 10% of all CO2 emissions worldwide, we figured even a small change would have the leverage to make a huge impact.

Our app matches users with similar commutes to facilitate carpooling with the minimum amount of detouring. Aims to make carpooling a better option withimprove cost, convenience, speed, and reliability.

Live Demo Website: https://sustain-a-ride.vercel.app/ride

Github Link: https://github.com/dchen327/sustain-a-ride-pub

Demo Video: https://youtu.be/iaGLzAGFTFE

## Competitive Advantage
Ride scheduling allows us to optimize user matching ahead of time which means significantly better matches than similar on-demand ride-hailing services. We use a combination of pathfinding algorithms, heuristics, and machine learning to identify matches that minimize commute times, gas mileage, and user inconvenience.

Apps like Uber and Lyft take anywhere from a 25% to +40% cut. As a non-profit, our app would take a smaller cut only as much as needed to cover business operating expenses, meaning cheaper prices for riders and higher compensation for drivers. Additionally, carpooling with multiple riders for every driver means each rider pays a fraction of the cost, enabling more affordable and accessible rides far below Uber/Lyft market rate.

Riders can get affordable rides custom fit to their schedule at $5-10 each, with access to a network of vetted drivers and real-time safety tracking to guarantee consistent rides.

Recurring rides empower drivers with a consistent, dependable income steam rather than the unpredictable earnings of on-demand services. Drivers can also choose to take on more or less passengers depending on their desired earnings and willingness to take detours, giving them more agency over how much they earn.

Depending on their route and number of passengers, drivers can reliably earn $400 to $1600 a month in passive income for a commute they would be taking anyways. Using our app could even speed up their drive with access to faster HOV lanes.

## Sustainability
We believe that carpooling is not only a convenient and cost-effective transportation option but also a powerful tool to combat climate change and promote a sustainable future. By facilitating carpooling, Sustain-A-Ride helps to reduce the number of cars on the road, resulting in lower greenhouse gas emissions and energy consumption. With fewer cars on the road, traffic congestion is reduced which leads to more fuel-efficiency for everyone and less noise pollution for surrounding communities.

Our non-profit app also helps create a more equitable and accessible transportation system. By offering affordable and accessible carpooling services, we make it easier for people to reduce their carbon footprint. By compensating drivers with a consistent, dependable income stream, we also provide an alternative source of income for those who may struggle to make ends meet.

Through Sustain-A-Ride, we hope to promote a sustainable future while also making transportation more affordable and accessible for everyone. We believe that by empowering commuters to make eco-friendly choices, we can create a healthier and happier community for all.

## Safety
When participating in a rideshare service, safety is key for both drivers and riders. Unlike other rideshare apps that are rider-first, our app is focused on both parties. That's why in addition to background checks for all users, our app automatically comes with a suite of safety features to improve the experience for our riders and drivers. Safety features include location-based tracking, anomaly and accident detection, and the option to share ride details with trusted contacts. Additionally, joining a carpool requires approval from all parties involved: the rider has to approve joining the driver and any existing members of the pool, the driver and all existing members of the pool have to approve the rider.

We run a background check, with a focus on violent crimes for both riders and drivers, and an additional check for driving-related accidents for the driver. We run periodic background checks on every rider and driver.

## How we built it
We built a demo of the easy-to-use interface riders and drivers can use to connect with our platform using a React web-app with a Python backend hosted on Vercel. After creating an account, riders and drivers alike can schedule a recurring ride over any day of the week by providing their point of origin, destination, and latest arrival time. We pass this information to our Python-based backend matching API which matches the user to a community of simulated riders and drivers with similar commutes. The user can then browse their matches on the frontend, and once they select the one that works best for them our pathfinding backend calculates the optimal path and displays it using the Google Maps Directions API alongside the cost per ride and expected pick-up/drop-off times.

## Economics
Perhaps the most difficult part of economics is achieving a critical mass of users to the point that there are enough drivers with sufficient density that good matches can be made. Our strategy here would be to do a local launch in one region, for example our initial launch could be limited to LA. We would advertise heavily in LA before launch and implement a referral system to try to quickly build a user base. In the early months venture capitalist money could be used to provide compelling incentives for drivers to ensure there are enough drivers to satisfy the demand of drivers. More detailed strategies could be developed from a close analysis of how apps like Uber and Lyft managed their initial launches.

After launch, the hope is that the app can self-sustain itself from rider payments. Payments from riders would provide continuous monetary incentive for the drivers. A small cut of the payments from riders would be used to pay for business expenses and server fees in a similar model to Uber and Lyft but with less exploitative cuts.
