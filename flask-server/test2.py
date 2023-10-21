import requests
import json
import threading
import concurrent.futures
import time
from geopy.geocoders import Nominatim
 
api = 'ZO3bZLF6I_hGUyiw2MPRq15oLhWdIJo17eyd_bm8etA'
time_limit = 20*60 
final_loc=[]
lock=threading.Lock()
max_threads = 1
start={17.547283,78.572479}

 
def coordinates_str(ori):
    
    ori = list(ori)
    origin = (str)(ori[0])+','+str(ori[1])
    return origin
 
 
def duration(des):
    
    loc=des['location']
    loc = {loc['lat'],loc['lng']}
    
    
    global start
    
    ori = coordinates_str(start)
    destination = coordinates_str(loc)
    
    
    url = 'https://router.hereapi.com/v8/routes?origin='+ori+'&destination=' +destination+'&return=summary,typicalDuration&transportMode=car&apikey='+api
    response = requests.get(url)
 
    if response.status_code == 200:
        data = response.json()
        
        dur = data['routes'][0]['sections'][0]['summary']['duration']
        
        if(dur<=time_limit):
            with lock:
                final_loc.append(des)
    else:
        print(f"Error in duration: {response.status_code}")
 
 
def extract_loc(data):
    
    fin=[]
    
    for i in data['items']:
        cur={
            'name':i['title'],
            'location': i['position'],
            'address' : i['address']['label']
        }
        fin.append(cur)
    
    return fin
 
 
def circle(center, radius,cat):
 
    center = coordinates_str(center)
    
    # print(cat)
    
    url = 'https://discover.search.hereapi.com/v1/discover?in=circle:' +center+';r='+str(radius)+'&q='+cat+'&apiKey='+api
 
    print(url)
    response = requests.get(url)
    
 
    if response.status_code == 200:
        data = response.json()
        
        return extract_loc(data)
        
        # ll = []
 
        # for i in data['items']:
        #     ll.append(i['position'])
 
        # return ll
    elif response.status_code == 429:
        retry_after = int(response.headers.get("Retry-After", 5))  # Default to 5 seconds
        print(f"Rate limited. Waiting {retry_after} seconds before retrying.")
    else:
        print(f"Error in circle: {response.status_code}")
 
 
 
def locations(ori,rec_data):
 
    all_locations = []
    location_list=circle(ori,50000,rec_data)
 
    # print(len(location_list))
 
    if(location_list==None):
        print("NoneType Issue")
        return
 
    threads=[]
    # print("location lists : ")
    # print(location_list)
    
    
    with concurrent.futures.ThreadPoolExecutor(max_threads) as executor:
        for locs in location_list:
            executor.submit(duration,locs)
 
    # print(len(final_loc))
 
 
def find_loc_cordinates(location):
    loc = Nominatim(user_agent="Geopy Library")
 
    # entering the location name
    getLoc = loc.geocode(location)
 
    if(getLoc ==None):
        return {17.547283,78.572479}
 
    # printing latitude and longitude
    return {getLoc.latitude, getLoc.longitude}
    # print("Latitude = ", getLoc.latitude, "\n")
    # print("Longitude = ", getLoc.longitude)
 
    
 
def trial(rec_data):
    
    global final_loc
    final_loc=[]
    
    ori=find_loc_cordinates(rec_data['movie']['title'])
    
    # ori = {17.547283,78.572479}
    # ori = {28.562250866495734, 77.38407682205673}
    print(rec_data)
    
    global start
    start=ori
    
    
    
    # if len(final_loc)!=0:
    #     return final_loc
    
    locations(ori,rec_data['movie']['type'])
    
    print(final_loc)
    
def fetch():
    global final_loc
    return final_loc
 
 
def fetch_O():
    global start
    return start

# trial('Hotels')
# print(fetch())
    
    # for i in range(len(data)):
    #     data[i]=list(data[i])
    
    # for i in data
    # dic = json.dumps(data)
    
    # return dic
    
# print(trial())
    
# exp={'items': [{'title': 'Rainbow Resorts', 'id': 'here:pds:place:356httek-bb6789bbb62c0857f1fbfa5c319e2c63', 'language': 'en', 'ontologyId': 'here:cm:ontology:hotel', 'resultType': 'place', 'address': {'label': 'Rainbow Resorts, Rajiv Rahadari, Thumukunta, Secunderabad 500078, India', 'countryCode': 'IND', 'countryName': 'India', 'stateCode': 'TS', 'state': 'Telangana', 'county': 'Medchal Malkajgiri', 'city': 'Secunderabad', 'district': 'Thumukunta', 'subdistrict': 'Rajiv Rahadari', 'postalCode': '500078'}, 'position': {'lat': 17.57057, 'lng': 78.56514}, 'access': [{'lat': 17.5706, 'lng': 78.56527}], 'distance': 2704, 'categories': [{'id': '500-5000-0053', 'name': 'Hotel', 'primary': True}, {'id': '500-5000-0000', 'name': 'Hotel/Motel'}, {'id': '500-5100-0000', 'name': 'Lodging'}], 'contacts': [{'mobile': [{'value': '+919705344423'}], 'www': [{'value': 'http://www.rainbowresorts.org', 'categories': [{'id': '500-5000-0053'}, {'id': '500-5100-0000'}]}]}]}, {'title': 'Mithlash Hotel', 'id': 'here:pds:place:356tepgg-c1f7c0d5a3f24cf38903c0709920ec21', 'language': 'en-GB', 'ontologyId': 'here:cm:ontology:hotel', 'resultType': 'place', 'address': {'label': 'Mithlash Hotel, Rajiv Rahadari, Thumukunta, Secunderabad 500078, India', 'countryCode': 'IND', 'countryName': 'India', 'stateCode': 'TS', 'state': 'Telangana', 'county': 'Medchal Malkajgiri', 'city': 'Secunderabad', 'district': 'Thumukunta', 'subdistrict': 'Rajiv Rahadari', 'postalCode': '500078'}, 'position': {'lat': 17.57269, 'lng': 78.56351}, 'access': [{'lat': 17.57269, 'lng': 78.56361}], 'distance': 2981, 'categories': [{'id': '500-5000-0053', 'name': 'Hotel', 'primary': True}, {'id': '500-5000-0000', 'name': 'Hotel/Motel'}, {'id': '500-5000-0054', 'name': 'Motel'}], 'references': [{'supplier': {'id': 'core'}, 'id': '1208177731'}]}, {'title': 'Aalankrita Resort & Convention-Shamirpet', 'id': 'here:pds:place:356tepgg-a56d3d405ae946a6b02b7fe402b7157e', 'language': 'en-GB', 'ontologyId': 'here:cm:ontology:hotel', 'resultType': 'place', 'address': {'label': 'Aalankrita Resort & Convention-Shamirpet, Devaryamjal, Hyderabad 500078, India', 'countryCode': 'IND', 'countryName': 'India', 'stateCode': 'TS', 'state': 'Telangana', 'county': 'Medchal Malkajgiri', 'city': 'Hyderabad', 'district': 'Devaryamjal', 'postalCode': '500078'}, 'position': {'lat': 17.57153, 'lng': 78.55888}, 'access': [{'lat': 17.57152, 'lng': 78.55888}], 'distance': 3058, 'categories': [{'id': '500-5000-0053', 'name': 'Hotel', 'primary': True}, {'id': '100-1000-0000', 'name': 'Restaurant'}, {'id': '100-1000-0001', 'name': 'Casual Dining'}, {'id': '100-1000-0002', 'name': 'Fine Dining'}, {'id': '100-1000-0008', 'name': 'Bistro'}, {'id': '100-1000-0009', 'name': 'Fast Food'}, {'id': '100-1100-0010', 'name': 'Coffee Shop'}, {'id': '200-2000-0011', 'name': 'Bar or Pub'}, {'id': '200-2000-0016', 'name': 'Billiards-Pool Hall'}, {'id': '200-2000-0368', 'name': 'Cocktail Lounge'}, {'id': '500-5000-0000', 'name': 'Hotel/Motel'}, {'id': '500-5100-0000', 'name': 'Lodging'}, {'id': '500-5100-0059', 'name': 'Holiday Park'}, {'id': '700-7200-0270', 'name': 'Entertainment and Recreation'}, {'id': '800-8400-0139', 'name': 'Banquet Hall'}, {'id': '800-8400-0176', 'name': 'Convention/Exhibition Center'}], 'references': [{'supplier': {'id': 'core'}, 'id': '1227312054'}, {'supplier': {'id': 'core'}, 'id': '1227312063'}, {'supplier': {'id': 'core'}, 'id': '1227312073'}, {'supplier': {'id': 'tripadvisor'}, 'id': '1131474'}], 'foodTypes': [{'id': '202-000', 'name': 'Indian', 'primary': True}], 'contacts': [{'phone': [{'value': '+914027709106'}, {'value': '+914027802020'}, {'value': '+918418309999'}], 'mobile': [{'value': '+918418309999'}, {'value': '+919848022019', 'categories': [{'id': '100-1000-0000'}, {'id': '100-1000-0001'}, {'id': '100-1000-0002'}, {'id': '100-1000-0008'}, {'id': '100-1000-0009'}, {'id': '100-1100-0010'}, {'id': '200-2000-0011'}, {'id': '200-2000-0016'}, {'id': '200-2000-0368'}, {'id': '500-5000-0053'}, {'id': '700-7200-0270'}, {'id': '800-8400-0139'}, {'id': '800-8400-0176'}]}, {'value': '+919848070223', 'categories': [{'id': '500-5000-0053'}]}], 'fax': [{'value': '+914027709106', 'categories': [{'id': '500-5000-0053'}, {'id': '500-5100-0059'}]}], 'www': [{'value': 'http://www.aalankrita.com', 'categories': [{'id': '100-1000-0000'}, {'id': '100-1000-0001'}, {'id': '100-1000-0002'}, {'id': '100-1000-0008'}, {'id': '100-1000-0009'}, {'id': '100-1100-0010'}, {'id': '200-2000-0011'}, {'id': '200-2000-0016'}, {'id': '200-2000-0368'}, {'id': '500-5000-0053'}, {'id': '500-5100-0000'}, {'id': '500-5100-0059'}, {'id': '700-7200-0270'}, {'id': '800-8400-0139'}, {'id': '800-8400-0176'}]}], 'email': [{'value': 'info@aalankrita.com', 'categories': [{'id': '100-1000-0000'}, {'id': '100-1000-0001'}, {'id': '100-1000-0002'}, {'id': '100-1000-0008'}, {'id': '100-1000-0009'}, {'id': '100-1100-0010'}, {'id': '200-2000-0011'}, {'id': '200-2000-0016'}, {'id': '200-2000-0368'}, {'id': '500-5000-0053'}, {'id': '700-7200-0270'}, {'id': '800-8400-0139'}, {'id': '800-8400-0176'}]}, {'value': 'roomreservations@aalankrita.com', 'categories': [{'id': '500-5000-0053'}, {'id': '500-5100-0059'}]}]}]}]}    
    
# extract_loc(exp)
# print(trial())
# print(trial(ori))
# print(trial())
 
# print()
 
# print(final_loc)