export const AddCource = () => {
  const Add = ( cource , num ) => {
    let Data = {
      id: cource._id ? cource._id: cource.id ,
      cource: cource.cource,
      price: cource.price,
      text: cource.text,
      number: cource.num ? cource.num: 1
    }
    /// проверка если есть курсы то достаем и приводим к обьекту если нет то пустой масив
    const Local = localStorage.getItem('cources') ? JSON.parse(localStorage.getItem('cources')) : []
    const Val = []
    let status = [ true ] /// тока масивом работает
      ////// проверка масива если есть уже  то добаление или удаление если число === 0
      Local.forEach(val => {
        Perebor( Val, val, Data, num, status )
      })
      // console.log(!!status[0]) // для понимания
      ////////// проверка есть ли в масиве уже Data
    const result = Val.find( item => {
      if(item.id === Data.id ) {
        return true
      } else {
        return false
      }
    })
    if(!!result === false && status[0]  ) { //  проверка если рес = false и есть масив
      Val.push(Data)
    }

    ////////// кладем в локал сторожа и приводим к Json формату
    localStorage.setItem( 'cources', JSON.stringify( Val ) )
  }

  const Delete = ( id ) => {
    const Local = JSON.parse(localStorage.getItem('cources')) 
    const result = []
    Local.forEach( item => {
      if( item.id !== id ) {
        result.push(item)
      }
    })
    localStorage.setItem( 'cources', JSON.stringify( result ) )
    return result
  }

  //1. пустой масив
  //2. в функции перебора значение
  //3. отображаемоу знач
  //4. число на сколько хочеш увел или умен
  //5. указывать статус, если не надо то ставить false
  const Perebor = ( Val, val, Data, num, status  ) => {
    // status тока масивом
    if(val.id === Data.id ) {
      if( val.number + num !== 0 ){
        const ValData = {
          id: val.id,
          cource: val.cource,
          price: val.price,
          text: val.text,
          number: val.number + num
        }
        Val.push(ValData)
      } else {
        if(!!status[0]) { status.unshift(false) }       // дата дало число меньше 0
      }
    } else {
      Val.push(val)
    }
  }
  
  return { Add, Perebor, Delete }
}