import React, { useState } from 'react'
import './add.sass'
import { Form, Icon, Input, Button, Upload, message  } from 'antd'
import { useDispatch } from 'react-redux'
import Axios from '../lib/axios'
import Fade from 'react-reveal'

const Add = () => {
const { TextArea } = Input
const dispatch = useDispatch()
//////////////
const [ course, setCourse ] = useState()
const [ price, setPrice ] = useState()
const [ text, setText ] = useState()
const [ img, setImage ] = useState()

const [ loadSub, setLoadSub ] = useState(false)
/////// инпут с чилом 
const Addnumber = (val) => {
  if(/^[0-9]+$/.test(val)) {
    setPrice(val)
  }
  if(val === "") {
    setPrice('')
  }
}
/////////////// отправка
const handleSubmit = e => {
  e.preventDefault();
  if( !!course && !!price && !!text && !!img) {
  const Data = new FormData()
  Data.append('course', course )
  Data.append('price', price ) 
  Data.append('text', text ) 
  Data.append('img', img )
  setLoadSub(true)
  Axios.post('/api/create', Data)
  .then(() => {
    setCourse('')
    setPrice('')
    setText('')
    setImage('')
    setImageUrl('')
    setLoadSub(false)
    message.success('Отправлено')
    Axios.get('/api/get')
    .then( req => dispatch({
      type: 'COURCES_ADD',
      cources: req.data.cources
    }))
    .catch( e => console.log(e) )
  })
  .catch(() => {
    message.error('Ошибка отправки')
    setLoadSub(false)
  })
  } else {
    message.warning('Введите коректные данные')
  }
}
///////////// загрузка изображения //////////////////////
const [ loading, setLoading ] = useState(false)
const [ imageUrl, setImageUrl ] = useState("")
/// результат загрузки
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
/// проверка файла
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загрузить тока JPG/PNG файл!');
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('картинка должна весить меньше 1мб');
  }
  if(isJpgOrPng &&  isLt2M) {
    setImage(file)
  }
  return isJpgOrPng && isLt2M;
}
///
const handleChange = info => {
  if (info.file.status === 'uploading') {
    setLoading( true )
  }
  if (info.file.status === 'done') {
    getBase64(info.file.originFileObj, imageUrl =>
      setImageUrl(imageUrl),
      setLoading( false )
    )
  }
}
/// кнопка загрузки
const uploadButton = (
  <div>
    <Icon type={loading ? 'loading' : 'plus'} />
    <div className="ant-upload-text">Загрузить изображение</div>
  </div>
)
  return(
  <Fade fraction = {0.1}>
    <div className="add_conteiner flex_center">
      <div className="add">
        <h1>Добавить товар</h1>
        <Form layout="inline" onSubmit={e => handleSubmit(e)}>
          <Input
              prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Название курса"
              onChange={e => setCourse(e.target.value)}
              value={course}
          />
          <Input
              prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Цена курса"
              style={{ marginTop: '30px'}}
              onChange={e => Addnumber(e.target.value)}
              value={price}
          />
          <TextArea
              placeholder="Описание курса"
              style={{ marginTop: '30px', height: '80px'}}
              onChange={e => setText(e.target.value)}
              value={text}
          />
          <div className="avatar">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          </div>
          <div className="avatar flex_center">
          <Button type="primary" htmlType="submit" disabled={loadSub}>
            отправить
          </Button>
          </div>
        </Form>
      </div>
    </div>
  </Fade>
  )
}
export default Add