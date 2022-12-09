const form = document.getElementById('uploadForm')
const sendFiles = async () =>{
    // imagenes
    const myFiles = document.getElementById('myFiles').files
    const formData = new FormData()
    Object.keys(myFiles).forEach(key =>{
        formData.append(myFiles.item(key).name, myFiles.item(key))
    })
    // Datos gerente
    const hotel = {
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    }
    const resFile = await fetch('https://proy-equipo3-final.fly.dev/validarImagenes', {
        method: 'POST',
        body: formData
    });
    const jsonFile = await resFile.json();
    if(jsonFile?.status == 'Correcto'){

        // crea el gerente
        const resDB = await fetch('https://proy-equipo3-final.fly.dev/hoteles',options);
        const jsonDB = await resDB.json();
        // guarda la imagen
        const resImagen = await fetch(`https://proy-equipo3-final.fly.dev/guardarImagenHotel?id_create=${jsonDB?.id_create}`,{
            method: 'POST',
            body: formData
        });
        const jsonImagen = await resImagen.json();
        location.assign(`https://proy-equipo3-final.fly.dev${jsonImagen?.ruta}`);
    }else{
        const h5 =  document.getElementById('message')
        h5.textContent = `${jsonFile?.status}, ${jsonFile?.message}`
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendFiles()
})