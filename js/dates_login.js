const URL = "http://localhost:5000/users/login";



var inicioDeSesion = document.getElementById('form_l');

export default inicioDeSesion.addEventListener('submit',function(e){
    e.preventDefault()
    console.log("me has dado click");
  
   let data = new FormData(inicioDeSesion); 
 /* let payload = {
    email:data.get("email"),
    password:data.get("pass")
  }*/
   console.log(data.get("email"));
   
     
   
    (
      async () => {
        await fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(Object.fromEntries(data))
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            localStorage.setItem("Token",JSON.stringify(data))
            
          })
      }
    )()
  

    console.log(data.get("pass"));


})