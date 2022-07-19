var formulario = document.getElementById('form');

formulario.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log("me has dado click");

  var datos = new FormData(formulario);

  console.log(JSON.stringify(Object.fromEntries(datos)));
  console.log(datos.get('first_name'));
  console.log(datos.get('last_name'));
  console.log(datos.get('email'));
  console.log(datos.get('password'));

  (
    async () => {
      await fetch('http://localhost:5000/users/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(Object.fromEntries(datos))
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  )()

  //localStorage.setItem()
})
