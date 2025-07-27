
import { useState } from 'react';
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

function App() {

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [file, setFile] = useState([])
  const [progress, setProgress] = useState(0)

  console.log(progress)



  const uploadPost = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append('name', name)
      formData.append('age', age)


      file.forEach((item) => {
        formData.append('files', item)
      })


      console.log(formData)


      const res = await axios.post(
        'https://file-upload-backend-lkbs.onrender.com/api/v2/file',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        }
      );


      alert(res.data.message || "uploaded successfully")

    setProgress(0)
    setName("")
    setAge(0)

    document.querySelector('#formFile').value = null


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div id='wrapper'>

      <section className='form-section border border-2 border-dark p-4'>

        <Form onSubmit={uploadPost}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} type="text" placeholder="Enter name..." onChange={(e) => { setName(e.target.value) }} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control value={age} type="number" placeholder="age" onChange={(e) => { setAge(e.target.value) }} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3 mt-2">

            <Form.Control type="file" multiple onChange={(e) => { setFile(Array.from(e.target.files)) }} />

          </Form.Group>

          {progress > 0 &&  <ProgressBar now={progress} label={`${progress}%`} className='my-4' />}

         

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </section>


    </div>
  )
}

export default App
