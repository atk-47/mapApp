import requests
import json
import threading
import concurrent.futures
import time
 
api = 'hkOwg_vp1p9zdrZsUZgAi6w7KG6NDz_WMvoy5CoBgXo'
time_limit = 20*60 
final_loc=[]
lock = threading.Lock()
max_threads = 4
start = {}
 
def coordinates_str(ori):
    
    ori = list(ori)
    origin = (str)(ori[0])+','+str(ori[1])
    return origin
 
 
def duration(des):
    
    global start
    
    ori = coordinates_str(start)
    destination = coordinates_str(des)
    
    
    url = 'https://router.hereapi.com/v8/routes?origin='+ori+'&destination=' +destination+'&return=summary,typicalDuration&transportMode=car&apikey='+api
    response = requests.get(url)
 
    if response.status_code == 200:
        data = response.json()
        
        dur = data['routes'][0]['sections'][0]['summary']['duration']
        # print(dur)
        if(dur<=time_limit):
            with lock:
                final_loc.append(des)
    else:
        print(f"Error in duration: {response.status_code}")
 
 
# def extract_loc(data):
# a=10
    
 
 
 
def circle(center, radius,cat):
 
    center = coordinates_str(center)
    url = 'https://discover.search.hereapi.com/v1/discover?in=circle:' +center+';r='+str(radius)+'&q='+cat+'&apiKey='+api
 
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        
        # extract_loc(data)
        
        ll = []
 
        for i in data['items']:
            ll.append(i['position'])
 
        return ll
    elif response.status_code == 429:
        retry_after = int(response.headers.get("Retry-After", 5))  # Default to 5 seconds
        print(f"Rate limited. Waiting {retry_after} seconds before retrying.")
    else:
        print(f"Error in circle: {response.status_code}")
 
 
 
def locations(ori):
 
    all_locations = []
    location_list=circle(ori,50000,'hotels')
 
    if(location_list==None):
        print("NoneType Issue")
        return
 
    threads=[]
    # print("location lists : ")
    # print(location_list)
    
    
    with concurrent.futures.ThreadPoolExecutor(max_threads) as executor:
        for i in location_list:
            loc = {i['lat'],i['lng']}
            executor.submit(duration,loc)

def trial():

    ori = {17.547283,78.572479}
    
    global start
    start=ori
    
    locations(ori)
    
    data=final_loc
    
    for i in range(len(data)):
        data[i]=list(data[i])
    
    # for i in data
    dic = json.dumps(data)
    
    return dic
    
    
# print(trial())
# print(trial(ori))
# trial(ori)
 
# print()
 
# print(final_loc)