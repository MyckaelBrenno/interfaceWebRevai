import React from 'react'
import { Header } from '../../components/Header/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios, { Axios } from 'axios'
import { MemoryRouter } from 'react-router-dom'

import './post.css'

const validationPost = yup.object().shape({
  requestCode: yup
    .number()
    .required("O parâmetro de 'request_code' é obrigatório")
    .positive('obrigatorio')
})

export function Post() {
  //let history = MemoryRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationPost)
  })

  const convert = data => {
    let formData = new FormData()
    const reader = new FileReader()

    const imgBlob = URL.createObjectURL(data.image[0])

    String = reader.readAsDataURL(data.image[0])

    reader.onload = function () {
      const base64Convert = reader.result
      const baseConvert = base64Convert.replace('data:image/jpeg;base64,', '')
      console.log(baseConvert)
    }

    formData.append('request_code', data.requestCode)
    //formData.append('image', )
    return addPost(formData)
  }

  const addPost = data =>
    axios
      .post('http://localhost:6001/extract_features', data)
      .then(response => {
        console.log(response)
        //history.push('/')
      })
      .catch(error => {
        console.log(error)
      })

  return (
    <div>
      <Header />
      <main>
        <div className="card-post">
          <h1>Realizar requisição</h1>
          <div className="line-post"></div>

          <div className="card-body-post">
            <form onSubmit={handleSubmit(convert)}>
              <div className="fields">
                <label>Request_code</label>
                <input
                  type="text"
                  name="requestCode"
                  {...register('requestCode')}
                />
                <p className="error-message">{errors.requestCode?.message}</p>
              </div>

              <div className="fields">
                <label>Imagem</label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  {...register('image')}
                />
                <p className="error-message">{errors.image?.message}</p>
              </div>

              <div className="btn-post">
                <button type="submit"> Enviar </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
