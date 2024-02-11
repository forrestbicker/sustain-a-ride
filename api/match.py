from geopy import distance
import random
import googlemaps
from http.server import BaseHTTPRequestHandler
import itertools
import json
import random
import os

API_KEY = os.environ.get('REACT_APP_GCP_KEY')
gmaps = googlemaps.Client(key=API_KEY)
MIN_RADIUS = 0.5
MAX_RADIUS = 1.5
NAMES = ("Bob Smith", "Alice Johnson", "Milo Knell", "Alan Wu", "Forest Bicker", "David Chen", "Maria Garcia", "James Johnson")
MESSAGESS = ("I'm really excited to meet new people!", "I want to help save the environment", "GO RAMS!", "This app is pretty cool", "Looking to start a basketball team with my carpool group!", "Anyone else work at the Google office?")

class Ride:
        def __init__(self, start_address, end_address):
            self.start_address = start_address
            self.end_address = end_address

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

        content_len = int(self.headers.get('Content-Length'))
        params = json.loads(self.rfile.read(content_len))
        ride_start, ride_end = params['rideStart'], params['rideEnd']
        #print(ride_start, ride_end)
        return_vals = handler.main(ride_start, ride_end)
        self.wfile.write(json.dumps(return_vals).encode())

    @staticmethod
    def generate_profile(): 
        name = random.choice(NAMES)
        message = random.choice(MESSAGESS)
        return {"name":name, "img":"empty", "quote":"empty", "message":message}

    
    @staticmethod
    def generate_nearby_location(origin_address):
        for i in range(10):
            res = handler.generate_nearby_location_helper(origin_address)
            tps = [comp["types"] for comp in res["address_components"]]
            flat = list(itertools.chain.from_iterable(tps))
            print(flat)
            if "street_number" in flat:
                return res['formatted_address']
            print("IM GAY")
            print(res)
        assert False
    
    @staticmethod
    def generate_nearby_location_helper(origin_address):
        r = random.uniform(MIN_RADIUS, MAX_RADIUS)
        theta = random.uniform(0, 360)
        origin = gmaps.geocode(origin_address)
        origin = origin[0]['geometry']['location']['lat'], origin[0]['geometry']['location']['lng']
        nearby_point = distance.distance(miles=r).destination(origin, theta)
        nearby_address = gmaps.reverse_geocode(nearby_point)[0]
        return nearby_address

    @staticmethod
    def escape(s):
        return ",".join([t.strip() for t in s.split(',')]).replace(" ", "+")

    def same(a, b):
        a = (a['lat'], a['lng'])
        b = (b['lat'], b['lng'])
        #print(distance.distance(a, b).miles)
        return distance.distance(a, b).miles < 0.09
    @staticmethod
    def fake_trip(ride_start, ride_end):
        ride = Ride(ride_start, ride_end)
        people = [(handler.generate_nearby_location(ride.start_address), handler.generate_nearby_location(ride.end_address)) for i in range(2)] # list, each element is lat,lon
        # iterate to find the best pickup order, construct the path
        driver, riders = people[0], people[1:]
        riders.append((ride.start_address, ride.end_address))
        start_location = gmaps.geocode(ride.start_address)[0]['geometry']['location']
        end_location = gmaps.geocode(ride.end_address)[0]['geometry']['location']
        duration = 0
        price = 5
        routes = gmaps.directions(driver[0], driver[1], mode='driving', waypoints=[r[i] for r in riders for i in range(2)], optimize_waypoints=True)[0]['legs']
        flag = False
        waypoints = [routes[0]['start_address']]
        for route in routes:
            waypoints.append(route['end_address'])
            price += route['duration']['value'] * 0.8 / 60
            #print(route['start_address'], route['end_address'], ride.start_address)
            if handler.same(route['start_location'], start_location):
                flag = True
            if flag:
                #print('recording')
                duration += route['duration']['value'] # in secs
            if handler.same(route['end_location'], end_location):
                flag = False
                

        
        # return out pool object
        #profiles = [generate_profile() for _ in people]
        return (handler.escape(ride.start_address), handler.escape(ride.end_address), list(map(handler.escape, waypoints)), duration, price) #path, time, price
    @staticmethod
    def generate_iframe(start, end, waypoints):
        key=API_KEY
        url = "https://www.google.com/maps/embed/v1/directions?" \
        "origin={0}&destination={1}&key={2}&mode=driving&waypoints={3}".format(
            start,end, key, "|".join(waypoints))
        #iframe = '<iframe width="1200" height="900" frameborder="0" style="border:0" ' \
        #        'src="{0}" allowfullscreen></iframe>'.format(url)

        return url

    @staticmethod
    def main(ride_start, ride_end):
        start, end, waypoints, duration, price = handler.fake_trip(ride_start, ride_end)
        iframe = handler.generate_iframe(start, end, waypoints)
        people = [handler.generate_profile() for i in range(2)]
        return {"people":people, "iframe":iframe, "cost":price, "duration":duration/60}

if __name__ == '__main__':
    ride_start, ride_end = "1129 W 27th St, Los Angeles, CA 90007, USA",  "301 Platt Blvd, Claremont, CA 91711, USA"
    out = handler.main(ride_start, ride_end)
    print(out)

    html = '''<iframe width="1200" height="900" frameborder="0" style="border:0" 
src="{0}" allowfullscreen></iframe>'''.format(out["iframe"])
    print(html)
    with open("gay.html", "w") as f:
        f.write(html)
    # ('250+North+College+Park+Dr,Upland,CA+91786', '1999+Avenue+of+the+Stars,Los+Angeles,CA+90067', ['2392+Yasamin+Pl,Upland,CA+91786,USA', '2392+Yasamin+Pl,Upland,CA+91786,USA', '250+College+Park+Dr,Upland,CA+91786,USA', '1999+Avenue+of+the+Stars,Los+Angeles,CA+90067,USA', '9303+Wilshire+Blvd,Los+Angeles,CA+90024,USA', '2271+Prosser+Ave,Los+Angeles,CA+90064,USA'], 4598, 69.4)
