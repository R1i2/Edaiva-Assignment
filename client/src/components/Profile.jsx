import React from "react";
function Profile(props){
    const [data, setData] = React.useState('');
    const url="/api/login/profile"
    const sl = "Bearer "+props.jsonWebToken
    const requestOptions = {
      method:"GET",
      headers:{
        'Content-Type':'application/json',
      },
      Authorization: JSON.stringify({sl})
    }
    fetch(url, requestOptions)
      .then(response=>response.json())
      .then((data)=>{console.log(data);setData(JSON.stringify(data))})
      .catch(err=>console.log(err))
    return(
        <div>
            <p>{!data?<h1>Namaste World</h1>:data}</p>
        </div>
    )
}
export default Profile;