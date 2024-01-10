namespace Server

open MongoDB.Driver

module Services = 
    let client = MongoClient @"mongodb://127.0.0.1:27017"
    let db = client.GetDatabase "eds"
