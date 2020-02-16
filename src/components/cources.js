import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Fade from 'react-reveal'
import './cources.sass'
import { Card, Button } from 'antd'
import Axios from '../lib/axios'

import { AddCource } from '../localStorage/add'

const Cources = () => {
  const { Meta } = Card
  const Url = useLocation()
  const dispatch = useDispatch()
  const cource = useSelector(state => state.Cource.cources)

  const { Add, Delete } = AddCource()

  useEffect(() => {
    if(cource.length === 0) {
    Axios.get('/api/get')
    .then( req => {
      dispatch({
        type: 'COURCES_ADD',
        cources: req.data.cources
      })
    })
    .catch( e => console.log(e) )
    }
  // eslint-disable-next-line
  },[Url.pathname])
  //// удаление и обновление
  const DeleteCource = (id, url) => {
    const Data = {
      id:id , url:url
    }
    Axios.post('/api/delete', Data)
    .then(() => {
      Axios.get('/api/get')
      .then( req => {
        dispatch({
          type: 'COURCES_ADD',
          cources: req.data.cources
        })
        Delete( id )
      })
      .catch( e => console.log(e) )
    })
    .catch(e => console.log(e))
  }

  return(
    <Fade fraction = {0.1}>
      <div className="cources_conteiner flex_center">
        {
          cource.map((val, index) => {
            return (
            <Card
              key={index}
              hoverable
              style={{ width: 240, margin: '10px' }}
              cover={<img style={{ width: '240px', height: '200px'}} alt="example" src={"http://qqqwwweee.eu-4.evennode.com/img/" + val.url} />}
            >
              <Meta title={val.cource} description={val.text + ' от ' + val.price + 'руб.'} />
              <Button
                style={{ marginTop: '10px' }}
                onClick={() => Add( val, 1 )}
              >
                Добавить в корзину
              </Button>
              <Button
                icon="delete"
                style={{ marginTop: '10px' }}
                onClick={() => DeleteCource( val._id, val.url ) }
              >
                Удалить
              </Button>
            </Card>
            )
          })
        }      
      </div>
    </Fade>
  )
}

export default Cources