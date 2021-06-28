const uploadFormHandler = async (event) => {
    event.preventDefault();
    let file = document.getElementById("upload-file").files[0];
    let sFile = JSON.stringify(document.getElementById("upload-file"));
    console.log( `submit: POST /upload/[${sFile}]` );
    console.log( JSON.stringify(file) );
    let formData = new FormData();
    formData.append("file", file);
    const response = await fetch('/upload', {
      method: "POST", 
      body: formData
    });
    const {data} = await response.json()
    console.log(data)
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('.upload-form')
    .addEventListener('submit', uploadFormHandler);
