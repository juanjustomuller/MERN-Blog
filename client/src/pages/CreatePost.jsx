import React, { useState } from 'react'
import ReactQuill from 'react-quill' //para el area de texto
import 'react-quill/dist/quill.snow.css'


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Sin categoría')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const POST_CATEGORIES = ["Agricultura", "Negocios", "Educación", "Arte", "Inversiones", "Sin categoría", "Clima"];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <section className="create-post">
      <div className="container">
        <h2>Crear Posteo</h2>
        <p className="form__error-message">
          Este es un mensaje de error
        </p>
        <form className='form create-post__form'>
          <input type="text" placeholder='Titulo' value={title} onChange={ e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)} >
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
            
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='jpg, png, jpeg' />
            <button type='submit' className='btn primary'>Crear</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost