import React, {useState, useEffect} from "react"
import axios from "axios"

var Mobile = () => {
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
    const [currentId,setcurrentId] = useState(null)
    const [search,setsearch] = useState()
    let i = 0
    useEffect( () => {
        if (i==0){
        const fetchData = async () => {
          const result = await axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps`)
            console.log("effect")
          setmobile(result.data.map(x=>{ return {id: x.id, name: x.name, category: x.category, description: x.description
        ,release: x["release_year"], size: x.size, price: x.price, rating: x.rating, platform: x["is_android_app"],platform1: x["is_ios_app"],image: x["image_url"]} }) )
        
    }
          
        fetchData()
      
    
    }
    }, [])

    const deleteButton = (event) =>{
        let id = parseInt(event.target.value);
        console.log(id)
        axios.delete(`http://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
        .then(() => {
          let newmobile = mobile.filter(el=> {return el.id !== id})
          setmobile(newmobile)
        })
     }
 
    const editButton = (event) => {
        let id = parseInt(event.target.value)
        axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
        .then(res => {
          let data = res.data
          console.log(data)
          setname(data.name)
          setcategory(data.category)
          setdescription(data.description)
          setrelease(data["release_year"])
          setsize(data.size)
          setprice(data.price)
          setrating(data.rating)
          setplatform(data["is_android_app"])
          setplatform1(data["is_ios_app"])
          setcurrentId(data.id)
        })
        
     }

    const handleChange = (event) =>{
        let inputValue = event.target.value
        setname(inputValue)
      }

    const handleChange2 = (event) =>{
        let inputValue = event.target.value
        setcategory(inputValue)
      }

    const handleChange3 = (event) =>{
        let inputValue = event.target.value
        setdescription(inputValue)
      }
      
      const handleChange4 = (event) =>{
        let inputValue = event.target.value
        setrelease(inputValue)
      }

    const handleChange5 = (event) =>{
        let inputValue = event.target.value
        setsize(inputValue)
      }

    const handleChange6 = (event) =>{
        let inputValue = event.target.value
        setprice(inputValue)
      }

      const handleChange7 = (event) =>{
        let inputValue = event.target.value
        setrating(inputValue)
      }

    const handleChange8 = (event) =>{
        let inputValue = event.target.value
        setimage(inputValue)
      }

    const handleChange9 = (event) =>{
        let inputValue = Boolean(event.target.value)
        if(inputValue == true){
            setplatform(1)
        }
        else if(inputValue == false){
            setplatform(0)
        }
        else{
            setplatform(1)
        }
      }

    const handleChange10 = (event) =>{
        let inputValue = Boolean(event.target.value)
        if(inputValue == true){
            setplatform1(1)
        }
        else if(inputValue == false){
            setplatform1(0)
        }
        else{
            setplatform1(1)
        }
      }

    const handleChange11 = (event) =>{
        let inputValue = event.target.value
        setsearch(inputValue)
      }


    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(platform)
        console.log(platform1)
        if (currentId === null){
          // untuk create data baru
          axios.post(`http://backendexample.sanbercloud.com/api/mobile-apps`, {name: name, category: category, description: description
          ,"release_year":release, size: size, price: price, rating: rating, "is_android_app": platform,"is_ios_app":platform1,"image_url": image})
          .then(res => {
              let x = res.data
              setmobile([...mobile, {id: x.id, name: x.name, category: x.category, description: x.description
                ,release: x["release_year"], size: x.size, price: x.price, rating: x.rating, platform: x["is_android_app"],platform1: x["is_ios_app"],image: x["image_url"]}])
          })
        }
        else{
          axios.put(`http://backendexample.sanbercloud.com/api/mobile-apps/${currentId}`, {name: name, category: category, description: description
          ,"release_year":release, size: size, price: price, rating: rating, "is_android_app": platform,"is_ios_app":platform1,"image_url": image})
          .then(() => {
              let singlemobile = mobile.find(el=> el.id === currentId)
              singlemobile.name= name
              singlemobile.category = category
              singlemobile.description = description
              singlemobile.release = release
              singlemobile.size = size
              singlemobile.price = price
              singlemobile.rating = rating
              singlemobile.platform = platform
              singlemobile.platform1 = platform1
              singlemobile.image = image
              setmobile([...mobile])
          })      
        }
      }
    const checkplatform = (a) => {
        let [android,ios] = a;
        if (android == 1 && ios==1){
            return("Android and Ios")
        }
        else if (android == 1){
            return("Android")
        }
        else if (ios == 1){
            return("Ios")
        }
    }

    let list = []
    const checksearch = () => {
            let len = mobile.length
            for (i=0;i<len;i++){
                let str = mobile[i].name;
                let n = str.includes(search)
                if(n===true){
                    list.push(i)
                    console.log(list)
                }
            }
            let it = list.length
            let total = []
            for (i=0;i<it;i++){
                let test = mobile[list[i]]
                total.push(test)
                console.log(total)
                setmobile(total)
            }
    }

    return(
        <>
        <input type="text" onChange={handleChange11}></input>
        <button onClick={checksearch}>search</button>
        <h1>Mobile Apps List</h1>
    <table>
      <thead>
        <div className="table">
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Release Year</th>
          <th>Size</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Platform</th>
          <th>Action</th>
        </tr>
        </div>
      </thead>
      <tbody>
          {
            mobile.map((val, index)=>{
              return(                    
                <div className="table">
                <tr>
                  <td>{index+1}</td>
                  <td>{val.name}</td>
                  <td>{val.category}</td>
                  <td>{val.description.substr(0,25)}....</td>
                  <td>{val.release}</td>
                  <td>{val.size}</td>
                  <td>{val.price}</td>
                  <td>{val.rating}</td>
                  <td>{checkplatform([val.platform,val.platform1])}</td>
                  <td><button value={val.id} onClick={editButton}>Edit</button><button value={val.id} onClick={deleteButton}>Delete</button></td>
                </tr>
                </div>
              )
            })
          }
      </tbody>
    </table>
    <h1>Books Form</h1>
    <div className="FormBaru" onSubmit={handleSubmit}>
    <form>
      <table>
    <tbody>
      <tr>
      <td><label>Name: </label></td>       
      <td><input type="text" value={name} onChange={handleChange}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Category: </label></td>
      <td><input type="text" value={category} onChange={handleChange2}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Description: </label></td>
      <td><input type="text" value={description} onChange={handleChange3}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Release Year: </label></td>       
      <td><input type="number" min="2007" max="2021" value={release} onChange={handleChange4}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Size(MB): </label></td>
      <td><input type="number" value={size} onChange={handleChange5}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Price: </label></td>
      <td><input type="number" value={price} onChange={handleChange6}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Rating: </label></td>       
      <td><input type="number" min="0" max="5" value={rating} onChange={handleChange7}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Image URL: </label></td>
      <td><input type="text" value={image} onChange={handleChange8}/></td>
      <br/>
      </tr>
      <tr>
      <td><label>Platform: </label></td>
      <td>
        <input type="checkbox" id="android" value={platform} onChange={handleChange9}/>
        <label for="android">Android</label><br/>
        <input type="checkbox" id="ios" value={platform1} onChange={handleChange10}/>
        <label for="ios">Ios</label><br/>
      </td>
      <br/>
      </tr>
      <tr>
      <td><button>submit</button></td>
      </tr>
      </tbody>
      </table>
    </form>
    </div>
        </>
    )
    
     

}

export default Mobile
