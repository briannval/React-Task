import React, {useState,useEffect} from "react";
import axios from "axios";

const Home = () => {
    const [mobile,setmobile] = useState([])
    const [name,setname] = useState()
    const [category,setcategory] = useState()
    const [description,setdescription] = useState()
    const [release,setrelease] = useState()
    const [size,setsize] = useState()
    const [price,setprice] = useState()
    const [rating,setrating] = useState()
    const [platform,setplatform] = useState()
    const [platform1,setplatform1] = useState()
    const [image,setimage] = useState()
    useEffect( () => {
        const fetchData = async () => {
          const result = await axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps`)
            
          setmobile(result.data.map(x=>{ return {id: x.id, name: x.name, category: x.category, description: x.description
        ,release: x["release_year"], size: x.size, price: x.price, rating: x.rating, platform: x["is_android_app"],platform1: x["is_ios_app"],image: x["image_url"]} }) )
        
    }
          
        fetchData()
      }, [])
    
      

    const platformtest = (a,b) => {
        if(a==1 & b==1){
            return "Android and Ios"
        }
        else if (a==1){
            return "Android"
        }
        else if (b==1){
            return "Ios"
        }
    }
    
      return(
        <>
            <h1>Popular Mobile Apps</h1>
          {
            mobile.map((val, index)=>{
                return(                    
                <div className="display">
                <h2>{val.name}</h2>
                <div className="inline">
                <img className="gambar" src={val.image}></img>
                <div className="text"><h2>Release Date : {val.release}<br/>Price : Rp.{val.price},-
                <br/>Rating : {val.rating}<br/>Size : {val.size/1000} GB<br />Platform : {platformtest(val.platform,val.platform1)}</h2></div>
                </div>
                <p><b>Description: </b>{val.description}</p>
                </div>
              )
            })
          }
      </>
    )
}

export default Home