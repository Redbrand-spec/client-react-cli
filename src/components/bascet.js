import React, { useState, useEffect } from 'react'
import './bascet.sass'
import { List, Typography, Button, message } from 'antd'

import Fade from 'react-reveal'
import { AddCource } from '../localStorage/add'

const Bascet = () => {
  const Local = localStorage.getItem('cources') ? JSON.parse(localStorage.getItem('cources')) : []
  const { Add, Perebor, Delete } = AddCource()
  const [ Courses, addCourses ] = useState(Local)
  //// добавление
  const AddLocal = ( item, num ) => {
    const Val = []
    Courses.forEach(val => {
      Perebor( Val, val, item, num, false )
    })
    addCourses(Val)
    Add( item, num )
  }
  //// удаление
  const DeleteCource = (id) => {
    const  result = Delete( id )
    addCourses(result)
  }
  //// итого
  let [ Sum, setSum ] = useState(0)
  useEffect( () => {
    let Res = 0
    Courses.forEach( async val => {
      await setSum(Res = Number(Res + val.price * val.number))
    })
    setSum(Res)
  },[Courses])
  //// Купить
  const Buy = () => {
    if( Sum === 0 ) { message.warning('Корзина пуста') }
    if( Sum !== 0 ) {
      localStorage.clear()
      addCourses([])
      message.success('покупка завершена на сумму: ' + Sum + ' руб.')
    }
  }

  return(
    <Fade fraction = {0.1}>
    <List
      size="small"
      header={<div>Курсы</div>}
      footer={<div style={{ margin: '0px 10px' }}>Итого: {Sum} ----------->
        <Button style={{ margin: '0px 10px' }} onClick={() => Buy() }> Купить </Button>
      </div>}
      bordered
      dataSource={Courses}
      renderItem={item => (
        <List.Item>
          <Typography.Text style={{ margin: '0px 10px' }} mark>{item.cource}</Typography.Text>Цена: {item.price * item.number} ||
           Количество: {item.number} Опмсание: {item.text} --
           ||
           <Button style={{ margin: '0px 10px' }} icon="minus" onClick={() => AddLocal( item, -1 )} ></Button>
           |
           <Button style={{ margin: '0px 10px' }} icon="plus" onClick={() => AddLocal( item, 1 )} ></Button>
           ||
          <Button onClick={() => DeleteCource(item.id) } style={{ margin: '0px 10px' }} >Удалить</Button>
        </List.Item>
      )}
    />
    </Fade>
  )
}

export default Bascet